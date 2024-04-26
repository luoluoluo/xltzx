import prisma from "@/core/prisma";
import { graphQLError } from "@/utils/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { Resolvers } from "../generated/graphql";
import { Context } from "../index";

const spuResolver: Resolvers<Context> = {
  Query: {
    async spus(_, args, __, info) {
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
  Mutation: {}
};

export default spuResolver;
