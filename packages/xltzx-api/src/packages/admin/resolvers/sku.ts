import prisma from "@/core/prisma";
import { genId } from "@/utils";
import { graphQLError } from "@/utils/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { Resolvers } from "../generated/graphql";
import { Context } from "../index";

const skuResolver: Resolvers<Context> = {
  Query: {
    async skus(_, args, __, info) {
      const select = new PrismaSelect(info).value;
      const where = {
        id: args.query?.id || undefined
      };
      const skus = await prisma.sku.findMany({
        take: args.query.limit || undefined,
        skip: args.query.offset || undefined,
        where: {
          ...where
        },
        select: { ...select.select.edges.select },

        orderBy: [{ id: "desc" }]
      });
      const count = await prisma.sku.count({ where: { ...where } });
      return {
        totalCount: count,
        edges: skus
      };
    },
    async sku(_, args, __, info) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const select = new PrismaSelect(info).value;
      const sku = await prisma.sku.findFirst({
        select: select.select,
        where: {
          id: args.query.id
        }
      });
      return sku as any;
    }
  },
  Mutation: {
    async createSku(_, args) {
      if (!args.input.spuId) {
        throw graphQLError({ message: "参数错误" });
      }
      const skuId = genId();
      const data: any = {
        ...(args.input as any),
        id: skuId
      };
      if (args.input?.skuFiles) {
        data.skuFiles = {
          create: args.input.skuFiles?.map(v => {
            return {
              ...v,
              id: genId()
            };
          })
        };
      }
      if (args.input?.skuSpecValues) {
        data.skuSpecValues = {
          create: args.input.skuSpecValues?.map(v => {
            return {
              ...v,
              id: genId()
            };
          })
        };
      }

      const createdSku = await prisma.$transaction(async tx => {
        const res = await prisma.sku.create({
          data
        });
        await prisma.spu.updateMany({
          where: {
            id: args.input.spuId!,
            skuId: null
          },
          data: {
            skuId
          }
        });
        return res;
      });
      // const createdSku = await prisma.sku.create({
      //   data
      // });

      return createdSku as any;
    },
    async updateSku(_, args) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const sku = await prisma.sku.findFirst({
        where: {
          id: args.query.id
        }
      });
      if (!sku) {
        throw graphQLError({ message: "NOTFOUND" });
      }
      const data = {
        ...(args.input as any)
      };
      if (args.input?.skuFiles) {
        data.skuFiles = {
          create: args.input.skuFiles?.map(v => {
            return {
              ...v,
              id: genId()
            };
          })
        };
      }
      if (args.input?.skuSpecValues) {
        data.skuSpecValues = {
          create: args.input.skuSpecValues?.map(v => {
            return {
              ...v,
              id: genId()
            };
          })
        };
      }
      const updatedSku = await prisma.$transaction(async tx => {
        await tx.skuFile.deleteMany({
          where: { skuId: args.query.id! }
        });
        await tx.skuSpecValue.deleteMany({
          where: { skuId: args.query.id! }
        });
        return await tx.sku.update({
          where: { id: args.query.id! },
          data
        });
      });
      return updatedSku as any;
    },
    async deleteSku(_, args) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const sku = await prisma.sku.findFirst({
        where: {
          id: args.query.id
        }
      });
      if (!sku) {
        throw graphQLError({ message: "NOTFOUND" });
      }
      const orderCount = await prisma.order.count({ where: { skuId: args.query.id } });
      if (orderCount) {
        throw graphQLError({ message: "有订单关联，无法删除" });
      }
      const deletedSku = await prisma.$transaction(async tx => {
        await tx.skuFile.deleteMany({
          where: { skuId: args.query.id! }
        });
        await tx.skuSpecValue.deleteMany({
          where: { skuId: args.query.id! }
        });
        return await tx.sku.delete({
          where: { id: args.query.id! }
        });
      });
      return deletedSku as any;
    }
  }
};

export default skuResolver;
