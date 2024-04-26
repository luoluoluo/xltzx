import prisma from "@/core/prisma";
import { graphQLError } from "@/utils/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { Resolvers } from "../generated/graphql";
import { Context } from "../index";

const bannerResolver: Resolvers<Context> = {
  Query: {
    async banners(_, args, context, info) {
      console.log(context);
      const select = new PrismaSelect(info).value;
      const where = {
        id: args.query?.id || undefined
      };
      const banners = await prisma.banner.findMany({
        take: args.query.limit || undefined,
        skip: args.query.offset || undefined,
        where: {
          ...where
        },
        select: { ...select.select.edges.select },

        orderBy: [{ sort: "asc" }]
      });
      const count = await prisma.banner.count({ where: { ...where } });
      return {
        totalCount: count,
        edges: banners
      };
    },
    async banner(_, args, __, info) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const select = new PrismaSelect(info).value;
      const banner = await prisma.banner.findFirst({
        select: select.select,
        where: {
          id: args.query.id
        }
      });
      return banner as any;
    }
  },
  Mutation: {}
};

export default bannerResolver;
