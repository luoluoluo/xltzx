import prisma from "@/core/prisma";
import { genId } from "@/utils";
import { graphQLError } from "@/utils/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { Resolvers } from "../generated/graphql";
import { Context } from "../index";

const bannerResolver: Resolvers<Context> = {
  Query: {
    async banners(_, args, __, info) {
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
        edges: banners as any
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
  Mutation: {
    async createBanner(_, args) {
      const bannerId = genId();
      const data: any = {
        ...(args.input as any),
        id: bannerId
      };
      const createdBanner = await prisma.banner.create({
        data
      });

      return createdBanner as any;
    },
    async updateBanner(_, args) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const banner = await prisma.banner.findFirst({
        where: {
          id: args.query.id
        }
      });
      if (!banner) {
        throw graphQLError({ message: "NOTFOUND" });
      }
      const data = {
        ...(args.input as any)
      };
      const updatedBanner = await prisma.$transaction(async tx => {
        return await tx.banner.update({
          where: { id: args.query.id! },
          data
        });
      });
      return updatedBanner as any;
    },
    async deleteBanner(_, args) {
      if (!args.query.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const banner = await prisma.banner.findFirst({
        where: {
          id: args.query.id
        }
      });
      if (!banner) {
        throw graphQLError({ message: "NOTFOUND" });
      }
      const deletedBanner = await prisma.$transaction(async tx => {
        return await tx.banner.delete({
          where: { id: args.query.id! }
        });
      });
      return deletedBanner as any;
    }
  }
};

export default bannerResolver;
