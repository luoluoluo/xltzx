import { getLogger } from "@/core/logger";
import prisma from "@/core/prisma";
import { decipherGcm, verifySign } from "@/utils/wechat-pay";
import { Request, Response } from "express";
import { OrderState } from "../../../store/generated/graphql";

export const createWechatPayCallback = async (req: Request, res: Response) => {
  const signature = String(req.headers["wechatpay-signature"] || "");
  const timestamp = String(req.headers["wechatpay-timestamp"] || "");
  const nonce = String(req.headers["wechatpay-nonce"] || "");
  const serial = String(req.headers["wechatpay-serial"] || "");
  const body = req.body as {
    id: string;
    create_time: string;
    resource_type: string;
    event_type: string;
    summary: string;
    resource: {
      original_type: string;
      algorithm: string;
      ciphertext: string;
      associated_data: string;
      nonce: string;
    };
  };
  const payReq = {
    timestamp,
    nonce,
    signature,
    body: JSON.stringify(body),
    serial
  };
  try {
    const ok = await verifySign(payReq);
    if (!ok) {
      getLogger().error({
        req: payReq,
        msg: "微信支付回调签名失败"
      });
      return res.json({ code: "FAIL", message: "失败" });
    }
    const payRes = decipherGcm<{ out_trade_no: string; transaction_id: string }>(body.resource);
    if (!payRes.out_trade_no) {
      getLogger().error({
        req: payReq,
        res: payRes,
        msg: "微信支付回调解密失败"
      });
      return res.json({ code: "FAIL", message: "失败" });
    }
    const order = await prisma.order.findFirst({
      where: {
        id: payRes.out_trade_no
      }
    });
    if (!order) {
      getLogger().error({
        req: payReq,
        res: payRes,
        msg: "微信支付回调失败"
      });
      return res.json({ code: "FAIL", message: "失败" });
    }
    if (order.state !== OrderState.Created) {
      return res.json({ code: "SUCCESS" });
    }

    // 更新订单状态
    await prisma.order.update({
      where: {
        id: payRes.out_trade_no
      },
      data: {
        payId: payRes.transaction_id,
        state: OrderState.Paid,
        paidAt: new Date()
      }
    });
    return res.json({ code: "SUCCESS" });
  } catch (err) {
    getLogger().error({
      req: payReq,
      msg: "微信支付回调失败",
      err
    });
    return res.json({ code: "FAIL", message: "失败" });
  }
};
