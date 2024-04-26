import { getLogger } from "@/core/logger";
import prisma from "@/core/prisma";
import { CommissionState } from "@/packages/admin/generated/graphql";
import { profitsharingAddReceivers, profitsharingCreateOrders } from "@/utils/wechat-pay";

// 完成分佣
export const cronCompleteCommission = async () => {
  try {
    const commission = await prisma.commission.findFirst({
      where: { state: CommissionState.Created },
      select: {
        id: true,
        amount: true,
        order: {
          select: {
            id: true,
            payId: true
          }
        },
        staff: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                code: true // openid
              }
            }
          }
        }
      }
    });
    if (!commission) return;
    // 添加微信支付分账方
    await profitsharingAddReceivers({
      type: "PERSONAL_OPENID",
      account: commission.staff.user?.code!,
      relation_type: "STAFF"
    });
    //  调用分账接口
    await profitsharingCreateOrders({
      transaction_id: commission.order.payId!,
      out_order_no: commission.id!,
      receivers: [
        {
          type: "PERSONAL_OPENID",
          account: commission.staff.user?.code!,
          amount: Math.floor(Number(commission.amount) * 100),
          description: `订单佣金（${commission.order.id}）`
        }
      ],
      unfreeze_unsplit: true
    });
    await prisma.commission.update({
      where: {
        id: commission.id
      },
      data: {
        state: CommissionState.Completed,
        completedAt: new Date()
      }
    });
  } catch (e) {
    getLogger().error(e, "cronCompleteCommission");
  }
};
