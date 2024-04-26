import prisma from "@/core/prisma";
import { graphQLError } from "@/utils/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { Resolvers } from "../generated/graphql";
import { Context } from "../index";

const articleResolver: Resolvers<Context> = {
  Query: {
    async articles(_, args, __, info) {
      const select = new PrismaSelect(info).value;
      const where = {
        id: args.query?.id || undefined,
        publishedAt: { not: null }
      };
      const articles = await prisma.article.findMany({
        take: args.query.limit || undefined,
        skip: args.query.offset || undefined,
        where: {
          ...where
        },
        select: { ...select.select.edges.select },

        orderBy: [{ id: "desc" }]
      });
      const count = await prisma.article.count({ where: { ...where } });
      return {
        totalCount: count,
        edges: articles as any
      };
    },
    async article(_, args, __, info) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const select = new PrismaSelect(info).value;
      const article = await prisma.article.findFirst({
        select: select.select,
        where: {
          id: args.query.id,
          publishedAt: { not: null }
        }
      });
      return article as any;
    }
  },
  Mutation: {}
};

export default articleResolver;
