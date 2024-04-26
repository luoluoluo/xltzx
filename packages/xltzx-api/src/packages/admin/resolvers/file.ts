import { getLogger } from "@/core/logger";
import prisma from "@/core/prisma";
import { graphQLError } from "@/utils/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { unlinkSync } from "fs";
import { Resolvers } from "../generated/graphql";
import { Context } from "../index";

const fileResolver: Resolvers<Context> = {
  Query: {
    async files(_, args, __, info) {
      const select = new PrismaSelect(info).value;
      const files = await prisma.file.findMany({
        take: args.query?.limit || undefined,
        skip: args.query?.offset || undefined,
        // where: {
        //   userId: args.query.me ? me?.id : undefined,
        // },
        select: select.select.edges.select,
        orderBy: [{ id: "desc" }]
      });
      const count = await prisma.file.count();
      return {
        totalCount: count,
        edges: files as any
      };
    },
    async file(_, args, __, info) {
      const select = new PrismaSelect(info).value;
      if (!args.query?.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const file = await prisma.file.findFirst({
        where: {
          id: args.query.id
        },
        select: select.select
      });
      return file as any;
    }
  },
  Mutation: {
    async deleteFile(_, args) {
      if (!args.query?.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const file = await prisma.file.findFirst({ where: { id: args.query.id } });
      if (!file) {
        throw graphQLError({ message: "参数错误" });
      }
      try {
        unlinkSync(file.path!);
      } catch (e) {
        getLogger().error(e, "删除文件失败");
      }
      const deletedFile = await prisma.file.delete({
        where: {
          id: args.query.id
        }
      });
      return deletedFile as any;
    }
  }
};

export default fileResolver;
