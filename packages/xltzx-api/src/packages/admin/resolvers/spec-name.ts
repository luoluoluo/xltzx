import prisma from "@/core/prisma";
import { PrismaSelect } from "@paljs/plugins";
import { Resolvers } from "../generated/graphql";
import { Context } from "../index";

const specNameResolver: Resolvers<Context> = {
  Query: {
    async specNames(_, args, __, info) {
      const select = new PrismaSelect(info).value;
      const where = {
        id: args.query?.id || undefined,
        spuId: args.query?.spuId || undefined
      };
      const specNames = await prisma.specName.findMany({
        take: args.query.limit || undefined,
        skip: args.query.offset || undefined,
        where: {
          ...where
        },
        select: { ...select.select.edges.select }
      });
      const count = await prisma.specName.count({ where: { ...where } });
      return {
        totalCount: count,
        edges: specNames
      };
    }
  }
};

export default specNameResolver;
