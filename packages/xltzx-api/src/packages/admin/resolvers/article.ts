import prisma from "@/core/prisma";
import { genId } from "@/utils";
import { graphQLError } from "@/utils/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { Resolvers } from "../generated/graphql";
import { Context } from "../index";

const articleResolver: Resolvers<Context> = {
  Query: {
    async articles(_, args, __, info) {
      const select = new PrismaSelect(info).value;
      const where = {
        id: args.query?.id || undefined
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
          id: args.query.id
        }
      });
      return article as any;
    }
  },
  Mutation: {
    async createArticle(_, args) {
      const articleId = genId();
      const data: any = {
        ...(args.input as any),
        id: articleId
      };
      const createdArticle = await prisma.article.create({
        data
      });

      return createdArticle as any;
    },
    async updateArticle(_, args) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const article = await prisma.article.findFirst({
        where: {
          id: args.query.id
        }
      });
      if (!article) {
        throw graphQLError({ message: "NOTFOUND" });
      }
      const data = {
        ...(args.input as any)
      };
      const updatedArticle = await prisma.$transaction(async tx => {
        return await tx.article.update({
          where: { id: args.query.id! },
          data
        });
      });
      return updatedArticle as any;
    },
    async publishArticle(_, args) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const article = await prisma.article.findFirst({
        where: {
          id: args.query.id
        }
      });
      if (!article) {
        throw graphQLError({ message: "NOTFOUND" });
      }
      const updatedArticle = await prisma.$transaction(async tx => {
        return await tx.article.update({
          where: { id: args.query.id! },
          data: {
            publishedAt: new Date()
          }
        });
      });
      return updatedArticle as any;
    },
    async unpublishArticle(_, args) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const article = await prisma.article.findFirst({
        where: {
          id: args.query.id
        }
      });
      if (!article) {
        throw graphQLError({ message: "NOTFOUND" });
      }
      const updatedArticle = await prisma.$transaction(async tx => {
        return await tx.article.update({
          where: { id: args.query.id! },
          data: {
            publishedAt: null
          }
        });
      });
      return updatedArticle as any;
    },
    async deleteArticle(_, args) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const article = await prisma.article.findFirst({
        where: {
          id: args.query.id
        }
      });
      if (!article) {
        throw graphQLError({ message: "NOTFOUND" });
      }
      const deletedArticle = await prisma.$transaction(async tx => {
        return await tx.article.delete({
          where: { id: args.query.id! }
        });
      });
      return deletedArticle as any;
    }
  }
};

export default articleResolver;
