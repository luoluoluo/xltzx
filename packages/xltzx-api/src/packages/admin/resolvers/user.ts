import prisma from "@/core/prisma";
import { graphQLError } from "@/utils/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { Resolvers } from "../generated/graphql";
import { Context } from "../index";

const userResolver: Resolvers<Context> = {
  Query: {
    async users(_, args, __, info) {
      const select = new PrismaSelect(info).value;
      const where = {
        id: args.query?.id || undefined,
        name: args.query?.name || undefined
      };
      const users = await prisma.user.findMany({
        take: args.query.limit || undefined,
        skip: args.query.offset || undefined,
        where,
        select: select.select.edges.select,
        orderBy: [{ id: "desc" }]
      });
      const count = await prisma.user.count({ where });
      return {
        totalCount: count,
        edges: users as any
      };
    },
    async distributionUsers(_, args, __, info) {
      const select = new PrismaSelect(info).value;
      const where = {
        id: args.query?.id || undefined,
        name: args.query?.name || undefined,
        staffId: args.query?.staffId || { not: null }
      };
      const users = await prisma.user.findMany({
        take: args.query.limit || undefined,
        skip: args.query.offset || undefined,
        where,
        select: select.select.edges.select,
        orderBy: [{ id: "desc" }]
      });
      const count = await prisma.user.count({ where });
      return {
        totalCount: count,
        edges: users as any
      };
    },
    async user(_, args, __, info) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const select = new PrismaSelect(info).value;
      const user = await prisma.user.findFirst({
        select: select.select,
        where: {
          id: args.query.id
        }
      });
      return user as any;
    }
  }
};

export default userResolver;
