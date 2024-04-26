import prisma from "@/core/prisma";
import { genId } from "@/utils";
import { PrismaSelect } from "@paljs/plugins";
import { Resolvers } from "../generated/graphql";
import { Context } from "../index";

const settingResolver: Resolvers<Context> = {
  Query: {
    async setting(_, __, ___, info) {
      const select = new PrismaSelect(info).value;
      const setting = await prisma.setting.findFirst({
        select: select.select
      });
      return setting;
    }
  },
  Mutation: {
    async mutationSetting(_, args) {
      const setting = await prisma.setting.findFirst({
        select: {
          id: true
        }
      });
      const data = {
        ...(args.input as any)
      };
      if (setting) {
        const res = await prisma.$transaction(async tx => {
          return await tx.setting.update({
            where: { id: setting.id },
            data
          });
        });
        return {
          id: res.id
        };
      } else {
        const id = genId();
        const res = await prisma.setting.create({
          data: { ...data, id }
        });
        return {
          id: res.id
        };
      }
    }
  }
};

export default settingResolver;
