import prisma from "@/core/prisma";
import { genId } from "@/utils";
import { graphQLError } from "@/utils/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { Resolvers, SpecName, SpecValue } from "../generated/graphql";
import { Context } from "../index";

const spuResolver: Resolvers<Context> = {
  Query: {
    async spus(_, args, __, info) {
      const select = new PrismaSelect(info).value;
      const where = {
        id: args.query?.id || undefined
      };
      const spus = await prisma.spu.findMany({
        take: args.query.limit || undefined,
        skip: args.query.offset || undefined,
        where: {
          ...where
        },
        select: { ...select.select.edges.select },

        orderBy: [{ sort: "asc" }, { id: "desc" }]
      });
      const count = await prisma.spu.count({ where: { ...where } });
      return {
        totalCount: count,
        edges: spus
      };
    },
    async distributionSpus(_, args, __, info) {
      const select = new PrismaSelect(info).value;
      const where = {
        id: args.query?.id || undefined,
        publishedAt: { not: null }
      };
      const spus = await prisma.spu.findMany({
        take: args.query.limit || undefined,
        skip: args.query.offset || undefined,
        where: {
          ...where
        },
        select: { ...select.select.edges.select },

        orderBy: [{ id: "desc" }]
      });
      const count = await prisma.spu.count({ where: { ...where } });
      return {
        totalCount: count,
        edges: spus
      };
    },
    async spu(_, args, __, info) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const select = new PrismaSelect(info).value;
      const spu = await prisma.spu.findFirst({
        select: select.select,
        where: {
          id: args.query.id
        }
      });
      return spu as any;
    }
  },
  Mutation: {
    async createSpu(_, args) {
      const spuId = genId();
      const data: any = {
        ...(args.input as any),
        id: spuId
      };
      if (args.input?.attrs) {
        data.attrs = {
          create: args.input.attrs?.map(v => {
            return {
              ...v,
              id: genId()
            };
          })
        };
      }
      data.specNames = args.input.specNames
        ? {
            create: args.input.specNames?.map(v => ({
              id: genId(),
              name: v.name,
              specValues: v.specValues
                ? {
                    create: v.specValues?.map(vv => ({
                      id: genId(),
                      spuId: spuId,
                      value: vv.value
                    }))
                  }
                : undefined
            }))
          }
        : undefined;
      const createdSpu = await prisma.spu.create({
        data
      });

      return createdSpu as any;
    },
    async updateSpu(_, args) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const spu = await prisma.spu.findFirst({
        where: {
          id: args.query.id
        }
      });
      if (!spu) {
        throw graphQLError({ message: "NOTFOUND" });
      }
      const data = {
        ...(args.input as any),
        attrs: undefined,
        specNames: undefined
      };
      if (args.input?.attrs) {
        data.attrs = {
          create: args.input.attrs?.map(v => {
            return {
              ...v,
              id: genId()
            };
          })
        };
      }

      const specNames = await prisma.specName.findMany({ where: { spuId: spu.id } });
      const specValues = await prisma.specValue.findMany({ where: { spuId: spu.id } });

      // 新增的
      const newSpecNames: SpecName[] = [];
      const newSpecValues: SpecValue[] = [];
      // // 删除的
      // const delSpecNameIds = [];
      // const delSpecValueIds = [];
      // 修改的
      const updateSpecNames: SpecName[] = [];
      const updateSpecValues: SpecValue[] = [];

      args.input.specNames?.map(v => {
        if (v.id) {
          if (!updateSpecNames.find(updateSpecName => updateSpecName.id === v.id)) {
            updateSpecNames.push({ id: v.id, name: v.name });
          }
        } else {
          v.id = genId();
          newSpecNames.push({
            id: v.id,
            spuId: spu.id,
            name: v.name
          });
        }
        v.specValues?.map(vv => {
          if (vv.id) {
            if (!updateSpecValues.find(updateSpecValue => updateSpecValue.id === vv.id)) {
              updateSpecValues.push({ id: vv.id, value: vv.value });
            }
          } else {
            newSpecValues.push({
              id: genId(),
              spuId: spu.id,
              specNameId: v.id,
              value: vv.value
            });
          }
        });
      });

      // 删除的
      const delSpecNames = specNames.filter(v => !updateSpecNames?.map(vv => vv.id).includes(v.id));
      const delSpecValues = specValues.filter(v => !updateSpecValues?.map(vv => vv.id).includes(v.id));

      if (delSpecValues.length) {
        const skuSpecValue = await prisma.skuSpecValue.findFirst({
          where: { specValueId: { in: delSpecValues.map(v => v.id) } }
        });
        if (skuSpecValue) {
          const delSpecValue = delSpecValues.find(v => v.id === skuSpecValue.specValueId);
          throw graphQLError({ message: `规格值：${delSpecValue?.value}，有sku关联无法删除` });
        }
      }

      const updatedSpu = await prisma.$transaction(async tx => {
        await tx.attr.deleteMany({ where: { spuId: spu.id } });
        // 删除
        if (delSpecNames.length) await tx.specName.deleteMany({ where: { id: { in: delSpecNames.map(v => v.id) } } });
        if (delSpecValues.length) await tx.specValue.deleteMany({ where: { id: { in: delSpecValues.map(v => v.id) } } });
        // 新增
        if (newSpecNames.length) await tx.specName.createMany({ data: newSpecNames as any });
        if (newSpecValues.length) await tx.specValue.createMany({ data: newSpecValues as any });
        // 修改
        if (updateSpecNames.length) {
          updateSpecNames.map(async v => {
            await tx.specName.update({ where: { id: v.id! }, data: { name: v.name! } });
          });
        }
        if (updateSpecValues.length) {
          updateSpecValues.map(async v => {
            await tx.specValue.update({ where: { id: v.id! }, data: { value: v.value! } });
          });
        }
        return await tx.spu.update({
          where: { id: args.query.id! },
          data
        });
      });
      return updatedSpu as any;
    },
    async deleteSpu(_, args) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const spu = await prisma.spu.findFirst({
        where: {
          id: args.query.id
        }
      });
      if (!spu) {
        throw graphQLError({ message: "NOTFOUND" });
      }
      const skuCount = await prisma.sku.count({ where: { spuId: args.query.id } });
      if (skuCount) {
        throw graphQLError({ message: "有sku关联，无法删除" });
      }
      const deletedSpu = await prisma.$transaction(async tx => {
        await tx.specValue.deleteMany({ where: { spuId: args.query.id } });
        await tx.specName.deleteMany({ where: { spuId: args.query.id } });
        return await tx.spu.delete({
          where: { id: args.query.id! }
        });
      });
      return deletedSpu as any;
    },
    async publishSpu(_, args) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const spu = await prisma.spu.findFirst({
        where: {
          id: args.query.id
        }
      });
      if (!spu) {
        throw graphQLError({ message: "NOTFOUND" });
      }
      const updatedSpu = await prisma.$transaction(async tx => {
        return await tx.spu.update({
          where: { id: args.query.id! },
          data: {
            publishedAt: new Date()
          }
        });
      });
      return updatedSpu as any;
    },
    async unpublishSpu(_, args) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const spu = await prisma.spu.findFirst({
        where: {
          id: args.query.id
        }
      });
      if (!spu) {
        throw graphQLError({ message: "NOTFOUND" });
      }
      const updatedSpu = await prisma.$transaction(async tx => {
        return await tx.spu.update({
          where: { id: args.query.id! },
          data: {
            publishedAt: null
          }
        });
      });
      return updatedSpu as any;
    },
    async setDefaultSku(_, args) {
      if (!args.query.id || !args.input.skuId) {
        throw graphQLError({ message: "参数错误" });
      }
      const spu = await prisma.spu.findFirst({
        where: {
          id: args.query.id
        }
      });
      if (!spu) {
        throw graphQLError({ message: "NOTFOUND" });
      }

      const sku = await prisma.sku.findFirst({ where: { id: args.input.skuId, spuId: args.query.id } });
      if (!sku) {
        throw graphQLError({ message: "NOTFOUND" });
      }
      const spuRes = await prisma.$transaction(async tx => {
        return await tx.spu.update({
          where: { id: spu.id },
          data: {
            skuId: sku.id
          }
        });
      });
      return { id: spuRes.id };
    }
  }
};

export default spuResolver;
