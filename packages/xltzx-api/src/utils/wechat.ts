import { getLogger } from "@/core/logger";
import redis from "@/core/redis";
import crypto from "node:crypto";

const accessTokenCacheKey = "tsxWechatAccessToken";
const ticketCackeKey = "tsxWechatTicket";
const getAccessTokenUrl = "https://api.weixin.qq.com/cgi-bin/token";
const getOauthAccessTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token";
const sendTemplateMessageUrl = "https://api.weixin.qq.com/cgi-bin/message/template/send";
const getTicketUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi";
const wechatAppId = process.env?.WECHAT_APP_ID || "";
const wechatAppSecret = process.env?.WECHAT_APP_SECRET || "";
interface Response {
  errcode: number;
  errmsg: string;
}

export interface GetOauthAccessTokenRequest {
  grant_type: string; // authorization_code
  appid: string;
  secret: string;
  code: string;
}

export interface GetOauthAccessTokenResponse extends Response {
  access_token: string;
  expires_in: number;
  openid: string;
}

export interface GetAccessTokenRequest {
  grant_type: string; // client_credential
  appid: string;
  secret: string;
}

export interface GetAccessTokenResponse extends Response {
  access_token: string;
  expires_in: number;
}

export type SendTemplateMessageRequestData = Record<
  string,
  {
    value: string;
  }
>;

export interface SendTemplateMessageRequest {
  touser: string;
  template_id: string;
  url: string;
  data: SendTemplateMessageRequestData;
}

export interface GetTicketResponse extends Response {
  ticket: string;
  expires_in: number;
}

export interface JsConfig {
  appId: string;
  timestamp: number;
  nonceStr: string;
  signature: string;
}
// 网页授权
export const getOauthAccessToken = async (code: string): Promise<GetOauthAccessTokenResponse> => {
  const data: GetOauthAccessTokenRequest = {
    appid: wechatAppId,
    secret: wechatAppSecret,
    grant_type: "authorization_code",
    code
  };
  const url = `${getOauthAccessTokenUrl}?${new URLSearchParams(data as any).toString()}`;
  const res = await fetch(url);
  return res.json() as Promise<GetOauthAccessTokenResponse>;
};
// token
export const getAccessToken = async (): Promise<string> => {
  const accessToken = await redis.get(accessTokenCacheKey);
  if (accessToken) {
    return accessToken;
  }
  const data: GetAccessTokenRequest = {
    appid: wechatAppId,
    secret: wechatAppSecret,
    grant_type: "client_credential"
  };
  const url = `${getAccessTokenUrl}?${new URLSearchParams(data as any).toString()}`;
  const res = await fetch(url);
  const resData = await (res.json() as Promise<GetAccessTokenResponse>);
  console.log(resData);
  if (resData.errcode) {
    throw new Error(resData.errmsg);
  }
  redis.setEx(accessTokenCacheKey, resData.expires_in - 60, resData.access_token);
  return resData.access_token;
};

// 发送模板消息
export const sendTemplateMessage = async (data: SendTemplateMessageRequest): Promise<Response> => {
  const accessToken = await getAccessToken();
  const url = `${sendTemplateMessageUrl}?access_token=${accessToken}`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return (await res.json()) as Promise<Response>;
};

export const getTicket = async (): Promise<string> => {
  const ticket = await redis.get(ticketCackeKey);
  if (ticket) {
    return ticket;
  }
  const accessToken = await getAccessToken();
  const res = await fetch(`${getTicketUrl}&access_token=${accessToken}`).then(res => res.json() as Promise<GetTicketResponse>);
  if (res.errcode) {
    getLogger().error(res, "getJsConfig error");
    throw new Error(res.errmsg);
  }
  redis.setEx(ticketCackeKey, res.expires_in - 60, res.ticket);
  return res.ticket;
};

export const getJsConfig = async (url: string): Promise<JsConfig> => {
  const ticket = await getTicket();
  const nonceStr = Math.random().toString(36).slice(2, 17);
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const sortedStr = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
  const signature = crypto.createHash("sha1").update(sortedStr).digest("hex");
  return {
    appId: wechatAppId,
    timestamp,
    nonceStr,
    signature
  };
};
