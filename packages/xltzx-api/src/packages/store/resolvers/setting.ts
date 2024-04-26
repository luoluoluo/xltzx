import prisma from "@/core/prisma";
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
  }
};

export default settingResolver;
