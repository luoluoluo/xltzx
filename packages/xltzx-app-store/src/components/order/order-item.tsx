"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Order, OrderState, Pay, SkuType } from "@/generated/graphql";
import { getChannel, getFileUrl } from "@/utils";
import { tokenKey } from "@/utils/auth";
import { graphqlRequest } from "@/utils/request";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useCallback, useEffect, useState } from "react";
import { AmountFormat } from "../amount";
import { Clipboard } from "../clipboard";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

const loadOrderState = async (id: string) => {
  const res = await graphqlRequest<{ order: Order }>(
    {
      document: /* GraphQL */ `
        query Order($query: OrderQuery!) {
          order(query: $query) {
            id
            state
          }
        }
      `,
      variables: { query: { id } }
    },
    { token: Cookies.get(tokenKey) || "" }
  );
  if (res.errors) {
    console.log(res.errors);
    return undefined;
  }
  return res.data?.order.state;
};

const OrderMeta = ({ name, value, children }: { name: string; value?: string; children?: React.ReactNode }) => {
  return (
    <div className="flex items-start">
      <div className="w-20 flex-shrink-0 text-gray-500">{name}</div>
      <div className=" select-text">{value}</div>
      {children}
    </div>
  );
};

const getStateText = (state: OrderState) => {
  switch (state) {
    case "created":
      return "待支付";
    case "canceled":
      return "已取消";
    case "paid":
      return "待发货";
    case "shipped":
      return "已发货";
    case "refunded":
      return "已退款";
    case "completed":
      return "已完成";
    default:
      return "";
  }
};

export const OrderItem = ({
  order,
  link,
  className,
  pay
}: {
  order: Order;
  link?: boolean;
  className?: string;
  pay?: boolean;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<"cancel" | "pay" | "refund">();
  const [state, setState] = useState<OrderState>(order.state!);
  const [payDialog, setPayDialog] = useState<{
    open: boolean;
    value: string;
  }>();
  const onPay = useCallback(async () => {
    if (state !== OrderState.Created) {
      return;
    }
    // 支付二维码
    if (getChannel(window.navigator.userAgent) !== "wechat") {
      setPayDialog({
        open: true,
        value: `${window.location.origin}/order/${order.id}?action=pay`
      });
      const t = setInterval(async () => {
        const state = await loadOrderState(order?.id || "");
        if (state === OrderState.Paid) {
          setState(state);
          clearInterval(t);
          setPayDialog({
            open: false,
            value: ""
          });
          return;
        }
      }, 3000);
      // 30 秒后删除定时器
      setTimeout(() => {
        clearInterval(t);
      }, 30000);
      return;
    }
    const res = await graphqlRequest<{ payOrder: Pay }>(
      {
        document: /* GraphQL */ `
          mutation PayOrder($query: PayOrderQuery!) {
            payOrder(query: $query) {
              wechatJsapi {
                appId
                timeStamp
                nonceStr
                package
                signType
                paySign
              }
            }
          }
        `,
        variables: {
          query: {
            orderId: order.id
          }
        }
      },
      { token: Cookies.get(tokenKey) || "" }
    );
    if (res.errors) {
      return toast({ title: res.errors[0].message, variant: "destructive" });
    }
    if (getChannel(window.navigator.userAgent) === "wechat" && (window as any)?.WeixinJSBridge) {
      (window as any)?.WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          ...res.data?.payOrder.wechatJsapi
        },
        (res: any) => {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            setState(OrderState.Paid);
          }
        }
      );
    }
  }, [order.id, state]);
  useEffect(() => {
    if (pay && state == OrderState.Created) onPay();
  }, [pay, state, onPay]);
  return (
    <>
      <div
        className={`px-4 border border-gray-100 shadow-sm rounded ${link ? " cursor-pointer" : ""} ${className}`}
        onClick={() => {
          if (link) router.push(`/order/${order.id}`);
        }}
      >
        <div className="flex justify-between mt-4 items-center text-black font-bold">
          <div className="text-black font-bold flex items-center gap-2">
            <Icons.order className="w-5 h-5" /> <div>订单信息</div>
          </div>
          <div>{getStateText(state)}</div>
        </div>
        <div className="mt-2 flex flex-col gap-1 p-2 text-sm">
          <OrderMeta name="订单编号" value={order.id!}></OrderMeta>
          <OrderMeta name="下单时间" value={dayjs(Number(order.createdAt)).format("YYYY-MM-DD HH:mm")}></OrderMeta>
          {order.canceledAt ? (
            <OrderMeta name="取消时间" value={dayjs(Number(order.canceledAt)).format("YYYY-MM-DD HH:mm")}></OrderMeta>
          ) : null}
          {order.paidAt ? (
            <OrderMeta name="支付时间" value={dayjs(Number(order.paidAt)).format("YYYY-MM-DD HH:mm")}></OrderMeta>
          ) : null}
          {order.shippedAt ? (
            <OrderMeta name="发货时间" value={dayjs(Number(order.shippedAt)).format("YYYY-MM-DD HH:mm")}></OrderMeta>
          ) : null}
          {order.refundedAt ? (
            <OrderMeta name="退款时间" value={dayjs(Number(order.refundedAt)).format("YYYY-MM-DD HH:mm")}></OrderMeta>
          ) : null}
        </div>
        <div className="text-black font-bold flex items-center gap-2 mt-4">
          <Icons.location className="w-5 h-5" /> <div>配送信息</div>
        </div>
        <div className="mt-2 flex flex-col gap-1 p-2 text-sm">
          <OrderMeta
            name="收件信息"
            value={`${order.shippingName} ${order.shippingPhone} ${order.shippingArea || ""} ${order.shippingAddress || ""}`}
          ></OrderMeta>
          {order.shippedAt && order.type === SkuType.Physical ? (
            <OrderMeta name="发货信息" value={`${order.expressCompany} ${order.expressCode}`}>
              <Clipboard
                className="px-1 py-[1px] text-xs bg-primary text-white rounded ml-2 h-auto"
                value={order.expressCode || ""}
                onSuccess={() => {
                  // navigator.clipboard.writeText(order.expressCode || "");
                  toast({ title: "复制成功" });
                }}
              >
                复制
              </Clipboard>
            </OrderMeta>
          ) : null}
        </div>
        <div className="text-black font-bold flex items-center gap-2 mt-4">
          <Icons.product className="w-5 h-5" /> <div>商品明细</div>
        </div>
        <div className="flex flex-col gap-4 w-full my-4 ">
          <div className="flex w-full bg-white p-2 rounded" key={order.skuId}>
            <Image
              priority
              width={480}
              height={480}
              alt=""
              src={getFileUrl(order.fileId!)}
              className="w-[120px] h-[120px] object-contain object-center"
            />
            <div className="flex justify-between w-[calc(100%-120px)] px-4 py-2 gap-4">
              <div>
                <div className="font-bold break-all whitespace-pre-wrap">{order.title}</div>
                <div className="text-gray-500 mt-2 text-sm">{order.spec}</div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <AmountFormat value={order.price!} size="sm"></AmountFormat>
                <div className="text-gray-500">{`x${order.quantity}`}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full border-t p-4 mt-4">
          {/* <AmountFormat value={order.amount!}></AmountFormat> */}
          <div className="flex justify-between items-center">
            <div className="text-sm">商品小计</div>
            <AmountFormat size="sm" value={order.amount || 0} />
          </div>
          <div className="flex justify-between items-center ">
            <div className="font-bold">合计</div>
            <AmountFormat value={order.amount || 0} />
          </div>
        </div>

        {state === OrderState.Created ? (
          <div className="flex w-full gap-4 border-t justify-end items-center py-4">
            <Button
              size="sm"
              disabled={loading === "pay"}
              onClick={async () => {
                if (loading === "pay") return;
                setLoading("pay");
                await onPay();
                setLoading(undefined);
              }}
            >
              立即支付
            </Button>
          </div>
        ) : null}
        {[OrderState.Paid, OrderState.Shipped].includes(state) ? (
          <div className="flex w-full gap-4 border-t justify-end items-center py-4">
            <Button
              size="sm"
              disabled={loading === "refund"}
              variant="destructive"
              onClick={async () => {
                if (state === OrderState.Shipped) {
                  toast({
                    title: "订单已发货，请联系客服申请退款",
                    variant: "destructive"
                  });
                  return;
                }
                const ok = confirm("确认退款？");
                if (!ok) return;
                if (loading === "refund") return;
                setLoading("refund");
                const res = await graphqlRequest<{ refundOrder: Order }>(
                  {
                    document: /* GraphQL */ `
                      mutation RefundOrder($query: OrderQuery!) {
                        refundOrder(query: $query) {
                          id
                        }
                      }
                    `,
                    variables: {
                      query: {
                        id: order.id
                      }
                    }
                  },
                  { token: Cookies.get(tokenKey) || "" }
                );
                setLoading(undefined);
                if (res.errors) {
                  return toast({ title: res.errors[0].message, variant: "destructive" });
                }
                // router.refresh();
                setState(OrderState.Refunded);
              }}
            >
              申请退款
            </Button>
          </div>
        ) : null}
      </div>
      <Dialog
        open={payDialog?.open}
        onOpenChange={open => {
          setPayDialog({ open, value: "" });
        }}
      >
        <DialogContent onOpenAutoFocus={e => e.preventDefault()}>
          <div className="p-4 flex flex-col items-center justify-center mt-8">
            <QRCodeCanvas value={payDialog?.value || ""} size={256}></QRCodeCanvas>
            <div className=" text-gray-500 mt-4">请使用微信扫码支付</div>
            <AmountFormat value={order?.amount || 0} className="mt-4"></AmountFormat>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
