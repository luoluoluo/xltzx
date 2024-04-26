import { getLogger } from "@/core/logger";
import prisma from "@/core/prisma";
import { CommissionState, OrderState } from "@/packages/admin/generated/graphql";
import { genId } from "@/utils";

// 完成订单
export const cronCompleteOrder = async () => {
  try {
    const days = 10; // 已发货超过10天
    const order = await prisma.order.findFirst({
      where: {
        shippedAt: {
          lte: new Date(new Date().getTime() - days * 24 * 3600 * 100)
        },
        state: OrderState.Shipped
      },
      select: {
        id: true,
        staffId: true,
        commissionAmount: true
      }
    });
    if (!order) {
      return;
    }
    await prisma.$transaction(async tx => {
      // 如果有staffId, 创建分佣
      if (order.staffId) {
        await tx.commission.create({
          data: {
            id: genId(),
            staffId: order.staffId,
            amount: order.commissionAmount,
            orderId: order.id,
            state: CommissionState.Created
          }
        });
      }
      await tx.order.update({
        where: { id: order.id },
        data: {
          state: OrderState.Completed,
          completedAt: new Date()
        }
      });
      return;
    });
  } catch (e) {
    getLogger().error(e, "cronCompleteOrder");
  }
};

export const cronCancalOrder = async () => {
  const mins = 30; //  超过30分钟未支付
  try {
    const nowTime = new Date().getTime();
    await prisma.$transaction(async tx => {
      const order = await tx.order.findFirst({
        where: { state: OrderState.Created, createdAt: { lte: new Date(nowTime - mins * 60 * 1000) } },
        select: {
          id: true,
          skuId: true,
          quantity: true
        }
      });
      if (!order) return;
      // 加库存
      await tx.sku.update({
        where: {
          id: order.skuId!
        },
        data: {
          stock: { increment: order.quantity! }
        }
      });
      await tx.order.update({
        where: { id: order.id },
        data: {
          state: OrderState.Canceled,
          canceledAt: new Date()
        }
      });
    });
  } catch (e) {
    getLogger().error(e, "cronCancalOrder");
  }
};
