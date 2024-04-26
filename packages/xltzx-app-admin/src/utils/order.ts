import { OrderState } from "@/generated/graphql";

export const getOrderStateText = (state: OrderState) => {
  switch (state) {
    case "created":
      return "待支付";
    case "paid":
      return "待发货";
    case "shipped":
      return "待完成";
    case "completed":
      return "已完成";
    case "canceled":
      return "已取消";
    case "refunded":
      return "已退款";
  }
};
