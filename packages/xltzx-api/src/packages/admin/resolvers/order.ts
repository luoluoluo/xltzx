import { getLogger } from "@/core/logger";
import prisma from "@/core/prisma";
import { genId } from "@/utils";
import { graphQLError } from "@/utils/graphql";
import { refund } from "@/utils/wechat-pay";
import { PrismaSelect } from "@paljs/plugins";
import { OrderState, Resolvers } from "../generated/graphql";
import { Context } from "../index";

const orderResolver: Resolvers<Context> = {
  Query: {
    async orders(_, args, __, info) {
      const select = new PrismaSelect(info).value;
      const where = {
        id: args.query?.id || undefined,
        userId: args.query?.userId || undefined,
        state: args.query?.state || undefined
      };
      const orders = await prisma.order.findMany({
        take: args.query.limit || undefined,
        skip: args.query.offset || undefined,
        where: {
          ...where
        },
        select: { ...select.select.edges.select },

        orderBy: [{ id: "desc" }]
      });
      const count = await prisma.order.count({ where: { ...where } });
      return {
        totalCount: count,
        edges: orders
      };
    },
    async distributionOrders(_, args, __, info) {
      const select = new PrismaSelect(info).value;
      const where = {
        id: args.query?.id || undefined,
        userId: args.query?.userId || undefined,
        state: args.query?.state || undefined,
        staffId: args.query?.staffId || { not: null }
      };
      const orders = await prisma.order.findMany({
        take: args.query.limit || undefined,
        skip: args.query.offset || undefined,
        where: {
          ...where
        },
        select: { ...select.select.edges.select },

        orderBy: [{ id: "desc" }]
      });
      const count = await prisma.order.count({ where: { ...where } });
      return {
        totalCount: count,
        edges: orders
      };
    },
    async order(_, args, __, info) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const select = new PrismaSelect(info).value;
      const order = await prisma.order.findFirst({
        select: select.select,
        where: {
          id: args.query.id
        }
      });
      return order as any;
    }
  },
  Mutation: {
    async shipOrder(_, args, __) {
      if (!args.query.id || !args.input.expressCode || !args.input.expressCompany) {
        throw graphQLError({ message: "参数错误" });
      }
      const order = await prisma.order.findFirst({
        where: { id: args.query.id, state: OrderState.Paid },
        select: {
          id: true
        }
      });
      if (!order) {
        throw graphQLError({ message: "数据异常" });
      }
      await prisma.$transaction(async tx => {
        const res = await tx.order.update({
          where: { id: order.id },
          data: {
            state: OrderState.Shipped,
            expressCode: args.input.expressCode,
            expressCompany: args.input.expressCompany,
            shippedAt: new Date()
          }
        });
        return res;
      });
      return {
        id: order?.id
      };
    },
    async refundOrder(_, args) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const order = await prisma.order.findFirst({
        where: { id: args.query.id },
        select: {
          id: true,
          amount: true,
          state: true,
          skuId: true,
          quantity: true
        }
      });
      if (!order) {
        throw graphQLError({ message: "数据异常" });
      }
      if (![OrderState.Paid, OrderState.Shipped].includes(order.state as OrderState)) {
        throw graphQLError({ message: "订单状态异常" });
      }
      // if (args.input.amount && args.input.amount > Number(order.amount)) {
      //   throw graphQLError({ message: "参数错误" });
      // }
      const orderAmount = Number(order.amount);
      const amount = args.input.amount && args.input.amount < orderAmount ? args.input.amount : orderAmount;
      const id = genId();
      await prisma.$transaction(async tx => {
        // 加库存
        await tx.sku.update({
          where: {
            id: order.skuId!
          },
          data: {
            stock: { increment: order.quantity! }
          }
        });
        await tx.refund.create({
          data: {
            id,
            orderId: order.id,
            amount
          }
        });
        const res = await tx.order.update({
          where: { id: order.id },
          data: {
            state: OrderState.Refunded,
            refundedAt: new Date()
          }
        });
        return res;
      });
      // 调用微信支付退款
      refund({
        out_refund_no: id,
        amount: {
          total: Math.round(orderAmount * 100),
          currency: "CNY",
          refund: Math.round(amount * 100)
        },
        out_trade_no: order.id
      })
        .then(res => {
          console.log(res);
        })
        .catch((e: any) => {
          getLogger().error(e, `退款失败：${order.id}`);
        });
      return {
        id: order?.id
      };
    }
  }
};

export default orderResolver;
