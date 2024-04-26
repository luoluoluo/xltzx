import { getLogger } from "@/core/logger";
import prisma from "@/core/prisma";
import { genId } from "@/utils";
import { graphQLError } from "@/utils/graphql";
import { refund, transactionsJsapi } from "@/utils/wechat-pay";
import { PrismaSelect } from "@paljs/plugins";
import { Order, OrderState, Resolvers, SkuType } from "../generated/graphql";
import { Context } from "../index";

const orderResolver: Resolvers<Context> = {
  Query: {
    async orders(_, args, context, info) {
      const select = new PrismaSelect(info).value;
      const where = {
        id: args.query?.id || undefined,
        userId: context.user?.id || undefined,
        state: args.query.state || undefined
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
    async createOrder(_, args, context) {
      if (!args.input.shippingName || !args.input.shippingPhone || !args.input.quantity || !args.input.skuId) {
        throw graphQLError({ message: "参数错误" });
      }

      const orderId = genId();
      const order: Order = {
        ...args.input,
        id: orderId,
        userId: context.user?.id,
        staffId: context.user?.staffId,
        skuId: args.input.skuId,
        quantity: args.input.quantity,
        amount: 0,
        price: 0,
        title: "",
        spec: "",
        fileId: "",
        commissionAmount: 0,
        state: OrderState.Created
      };
      // 查询sku
      const sku = await prisma.sku.findFirst({
        where: {
          id: args.input.skuId
        },
        select: {
          id: true,
          title: true,
          stock: true,
          price: true,
          commissionPrice: true,
          fileId: true,
          type: true,
          spu: {
            select: {
              id: true,
              title: true,
              publishedAt: true
            }
          },
          skuSpecValues: {
            select: {
              id: true,
              specValue: {
                select: {
                  id: true,
                  value: true,
                  specName: {
                    select: {
                      id: true,
                      name: true
                    }
                  }
                }
              }
            }
          }
        }
      });
      if (!sku || !sku.spu.publishedAt) {
        throw graphQLError({ message: "商品失效", code: "INVALID_PRODUCT" });
      }
      if ((order.quantity || 0) > sku.stock) {
        throw graphQLError({
          message: "商品库存不足",
          code: "OUT_OF_STOCK",
          data: { quantity: sku.stock }
        });
      }

      order.type = sku.type as SkuType;
      order.fileId = sku.fileId;
      order.price = Number(sku.price);
      order.title = sku.title;
      order.spec =
        sku.skuSpecValues?.reduce((previousValue, currentValue) => {
          return `${previousValue}  ${currentValue.specValue?.specName?.name}: ${currentValue.specValue?.value}`;
        }, "") || "";
      order.amount = Number(sku.price) * order.quantity!;
      order.commissionAmount = Number(sku.commissionPrice) * order.quantity!;

      // console.log(order, orderSkus);
      const createdOrder = await prisma.$transaction(async tx => {
        // 减库存
        await tx.sku.update({
          where: {
            id: order.skuId!
          },
          data: {
            stock: { decrement: order.quantity! }
          }
        });
        const res = await tx.order.create({
          data: order as any
        });
        return res;
      });
      return createdOrder as any;
    },
    async payOrder(_, args, context) {
      const order = await prisma.order.findFirst({
        where: { id: args.query.orderId, userId: context?.user?.id!, state: OrderState.Created },
        select: {
          id: true,
          amount: true,
          staffId: true
        }
      });
      if (!order) {
        throw graphQLError({ message: "数据异常" });
      }
      const payRes = await transactionsJsapi({
        out_trade_no: order.id,
        description: "订单支付",
        payer: {
          openid: context.user?.code!
        },
        amount: {
          total: Math.round(Number(order.amount) * 100),
          currency: "CNY"
        },
        settle_info: {
          profit_sharing: order.staffId ? true : false // 分账
        }
      });

      console.log(payRes);

      return {
        wechatJsapi: { ...payRes }
      };
    },
    async refundOrder(_, args, context) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const order = await prisma.order.findFirst({
        where: { id: args.query.id, userId: context?.user?.id!, state: OrderState.Paid },
        select: {
          id: true,
          amount: true,
          skuId: true,
          quantity: true
        }
      });
      if (!order) {
        throw graphQLError({ message: "数据异常" });
      }
      const id = genId();
      const orderAmount = Number(order.amount);
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
            amount: order.amount
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
          refund: Math.round(orderAmount * 100)
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
