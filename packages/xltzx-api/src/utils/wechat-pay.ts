import { getLogger } from "@/core/logger";
import * as x509 from "@fidm/x509";
import crypto from "crypto";

const baseUrl = "https://api.mch.weixin.qq.com";
const getCertificatesUrl = `${baseUrl}/v3/certificates`;
const transactionsJsapiUrl = `${baseUrl}/v3/pay/transactions/jsapi`;
const refundUrl = `${baseUrl}/v3/refund/domestic/refunds`;
const profitsharingAddReceiversUrl = `${baseUrl}/v3/profitsharing/receivers/add`;
const profitsharingCreateOrdersUrl = `${baseUrl}/v3/profitsharing/orders`;

const appid = process.env?.WECHAT_APP_ID || "";
const mchid = process.env?.WECHAT_PAY_MCHID || "";
const notifyUrl = process.env?.WECHAT_PAY_NOTIFY_URL || "";
const publicKey = process.env?.WECHAT_PAY_PUBLIC_KEY || "";
const privateKey = process.env?.WECHAT_PAY_PRIVATE_KEY || "";
const authType = "WECHATPAY2-SHA256-RSA2048";
const key = process.env?.WECHAT_PAY_KEY || "";

interface Certificate {
  effective_time: string;
  expire_time: string;
  serial_no: string;
  encrypt_certificate: {
    algorithm: string;
    associated_data: string;
    ciphertext: string;
    nonce: string;
  };
}

export interface PayAmount {
  total: number;
  currency?: string;
}

// 支付者
interface PayPayer {
  openid: string;
}
interface TransactionResponse {
  code?: string;
  message?: string;
  prepay_id: string;
}

export interface TransactionRequest {
  appid?: string;
  mchid?: string;
  description: string;
  out_trade_no: string;
  time_expire?: string;
  attach?: string;
  notify_url?: string;
  goods_tag?: string;
  amount: PayAmount;
  payer: PayPayer;
  settle_info?: {
    profit_sharing?: boolean;
  };
}

export interface RefundAmount {
  total: number;
  currency: string;
  refund: number;
}

export interface RefundRequest {
  out_refund_no: string;
  amount: RefundAmount;
  out_trade_no: string;
}

export interface RefundResponse {
  code?: string;
  message?: string;
  status: string;
  out_trade_no?: string;
}

export interface ProfitsharingReceiver {
  type: "MERCHANT_ID" | "PERSONAL_OPENID" | "PERSONAL_SUB_OPENID";
  account: string;
  name?: string;
  relation_type: "STAFF" | "PARTNER" | "USER" | "SUPPLIER";
}

export interface ProfitsharingAddReceiversRequest extends ProfitsharingReceiver {
  appid?: string;
}

export interface ProfitsharingAddReceiversResponse {
  code?: string;
  message?: string;
  status: string;
}

export interface ProfitsharingCreateOrderReceiver {
  type: ProfitsharingReceiver["type"];
  name?: ProfitsharingReceiver["name"];
  account: ProfitsharingReceiver["account"];
  amount: number;
  description: string;
}

export interface ProfitsharingCreateOrdersRequest {
  appid?: string;
  transaction_id: string;
  out_order_no: string;
  receivers: ProfitsharingCreateOrderReceiver[];
  unfreeze_unsplit: boolean;
}

export interface ProfitsharingCreateOrdersResponse {
  code?: string;
  message?: string;
  status: string;
}

export const decipherGcm = <T extends any>({
  ciphertext,
  associated_data,
  nonce
}: {
  ciphertext: string;
  associated_data: string;
  nonce: string;
}): T => {
  if (!key) throw new Error("缺少key");
  const _ciphertext = Buffer.from(ciphertext, "base64");
  const authTag: any = _ciphertext.slice(_ciphertext.length - 16);
  const data = _ciphertext.slice(0, _ciphertext.length - 16);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, nonce);
  decipher.setAuthTag(authTag);
  decipher.setAAD(Buffer.from(associated_data));
  const decoded = decipher.update(data, undefined, "utf8");
  try {
    return JSON.parse(decoded);
  } catch (e) {
    return decoded as T;
  }
};

const sha256WithRsa = (data: string): string => {
  if (!privateKey) throw new Error("缺少秘钥文件");
  return crypto.createSign("RSA-SHA256").update(data).sign(privateKey, "base64");
};

const getSN = (): string => {
  if (!publicKey) throw new Error("缺少公钥");
  const certificate = x509.Certificate.fromPEM(Buffer.from(publicKey));
  return certificate.serialNumber;
};

const request = async <T>(url: string, init?: RequestInit | undefined) => {
  const method = init?.method || "GET";
  const body = init?.body;
  const nonceStr = Math.random().toString(36).slice(2, 17);
  const timestamp = String(Math.round(new Date().getTime() / 1000));
  const str = `${method}\n${url.replace(baseUrl, "")}\n${timestamp}\n${nonceStr}\n${body || ""}\n`;
  const signature = sha256WithRsa(str);
  const sn = getSN();
  const authorization = `${authType} mchid="${mchid}",nonce_str="${nonceStr}",timestamp="${timestamp}",serial_no="${sn}",signature="${signature}"`;
  if (init) {
    init.headers = {
      ...init.headers,
      Authorization: authorization,
      "Accept-Language": "zh-CN",
      "Content-Type": "application/json"
    };
  }
  return fetch(url, init).then(res => {
    return res.json() as T;
  });
};

const getCertificate = async (serial: string) => {
  const result = await request<{ data: Certificate[] }>(getCertificatesUrl, { method: "GET" });
  const certificates = {} as { [key in string]: string };
  result.data.forEach(item => {
    const decryptCertificate = decipherGcm<string>({
      ...item.encrypt_certificate
    });
    certificates[item.serial_no] = x509.Certificate.fromPEM(Buffer.from(decryptCertificate)).publicKey.toPEM();
  });
  return certificates[serial];
};
export const verifySign = async (params: {
  timestamp: string | number;
  nonce: string;
  body: string;
  signature: string;
  serial: string;
}) => {
  const { timestamp, nonce, body, signature, serial } = params;
  const publicKey = await getCertificate(serial);
  if (!publicKey) {
    throw new Error("平台证书序列号不相符，未找到平台序列号");
  }
  const verify = crypto.createVerify("RSA-SHA256");
  verify.update(`${timestamp}\n${nonce}\n${body}\n`);
  return verify.verify(publicKey, signature, "base64");
};

export const transactionsJsapi = async (params: TransactionRequest) => {
  if (!params.appid) params.appid = appid;
  if (!params.mchid) params.mchid = mchid;
  if (!params.notify_url) params.notify_url = notifyUrl;
  const result = await request<TransactionResponse>(transactionsJsapiUrl, {
    method: "POST",
    body: JSON.stringify(params)
  });
  if (result.code) {
    getLogger().error({ params, result }, "支付失败");
    throw new Error(result.message);
  }
  const data = {
    appId: params.appid,
    timeStamp: parseInt(+new Date() / 1000 + "").toString(),
    nonceStr: Math.random().toString(36).substr(2, 15),
    package: `prepay_id=${result.prepay_id}`,
    signType: "RSA",
    paySign: ""
  };
  data.paySign = sha256WithRsa([data.appId, data.timeStamp, data.nonceStr, data.package, ""].join("\n"));
  return data;
};

export const refund = async (params: RefundRequest) => {
  const result = await request<RefundResponse>(refundUrl, {
    method: "POST",
    body: JSON.stringify(params)
  });
  if (result.code && result.status !== "SUCCESS") {
    getLogger().error({ params, result }, "退款失败");
    throw new Error(result.message);
  }
  return result;
};

// 添加分账接收方
export const profitsharingAddReceivers = async (params: ProfitsharingAddReceiversRequest) => {
  if (!params.appid) params.appid = appid;
  const result = await request<ProfitsharingAddReceiversResponse>(profitsharingAddReceiversUrl, {
    method: "POST",
    body: JSON.stringify(params),
    headers: { "Wechatpay-Serial": getSN() }
  });
  if (result.code && result.status !== "SUCCESS") {
    getLogger().error({ params, result }, "添加分账接收方失败");
    throw new Error(result.message);
  }
};

// 创建分账单
export const profitsharingCreateOrders = async (params: ProfitsharingCreateOrdersRequest) => {
  if (!params.appid) params.appid = appid;
  const result = await request<ProfitsharingCreateOrdersResponse>(profitsharingCreateOrdersUrl, {
    method: "POST",
    body: JSON.stringify(params),
    headers: { "Wechatpay-Serial": getSN() }
  });
  if (result.code && result.status !== "SUCCESS") {
    getLogger().error({ params, result }, "创建分账单失败");
    throw new Error(result.message);
  }
};
