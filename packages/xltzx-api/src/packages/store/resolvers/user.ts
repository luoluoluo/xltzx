import { getLogger } from "@/core/logger";
import prisma from "@/core/prisma";
import redis from "@/core/redis";
import { genId } from "@/utils";
import { sign } from "@/utils/auth";
import { graphQLError } from "@/utils/graphql";
import { getOauthAccessToken } from "@/utils/wechat";
import { Resolvers, Token } from "../generated/graphql";
import { Context } from "../index";

const userResolver: Resolvers<Context> = {
  Query: {
    async me(_, __, context) {
      return { ...context.user, password: "" };
    },
    async loginKey(_, args) {
      const type = args.query.type;
      const loginKey = `${type}-${genId()}`;
      await redis.setEx(loginKey, 300, "");
      return {
        type,
        loginKey
      };
    }
  },
  Mutation: {
    async loginWithKey(_, args) {
      const token: Token = {
        id: "",
        token: ""
      };
      if (!args.input.loginKey) {
        throw graphQLError({ message: "参数错误" });
      }
      const loginKey = args.input.loginKey;
      const tokenData = await redis.get(loginKey);
      if (!tokenData) {
        return token;
      }
      return JSON.parse(tokenData) as Token;
    },
    async login(_, args) {
      if (!args.input.code || !args.input.type) {
        throw graphQLError({ message: "参数错误" });
      }
      let code = "";
      switch (args.input.type) {
        case "wechat": // 微信登录
          try {
            const res = await getOauthAccessToken(args.input.code || "");
            if (res.errcode) {
              throw graphQLError({ message: res.errmsg });
            }
            code = res.openid;
          } catch (e) {
            getLogger().error(e, "getOauthAccessToken");
            throw graphQLError({ message: JSON.stringify(e) });
          }
          break;
        default:
          throw graphQLError({ message: "参数错误" });
      }
      let user = await prisma.user.findFirst({
        where: {
          code,
          type: args.input.type
        }
      });
      if (!user) {
        const id = genId();
        getLogger().debug({ type: args.input.type, id, code, name: `${args.input.type}-${code}` });
        user = await prisma.user.create({
          data: { type: args.input.type, id, code, name: "" }
        });
      }
      const token = sign(user.id, user.code);
      if (args.input.loginKey) {
        await redis.setEx(args.input.loginKey, 300, JSON.stringify({ id: user.id, token }));
      }
      return {
        token,
        id: user.id
      };
    },
    async updateMe(_, args, context) {
      const updatedUser = await prisma.user.update({
        where: { id: context.user?.id! },
        data: {
          ...(args.input as any)
        }
      });
      return {
        id: updatedUser.id
      };
    },
    async bindStaff(_, args, context) {
      if (!context.user) {
        throw graphQLError({ message: "参数错误" });
      }
      if (!args.input.staffId) {
        throw graphQLError({ message: "参数错误" });
      }

      const staff = await prisma.staff.findFirst({
        where: { id: args.input.staffId }
      });
      // staff 不存在
      if (!staff) {
        throw graphQLError({ message: "参数错误" });
      }
      const userCount = await prisma.user.count({
        where: {
          staffId: staff.id
        }
      });
      await prisma.$transaction(async tx => {
        // 收款微信账户
        if (userCount === 0) {
          await tx.staff.update({
            where: {
              id: staff.id
            },
            data: {
              userId: context.user?.id!,
              userBindedAt: new Date()
            }
          });
        }
        // 收款微信账户或者未绑定销售员，则更新销售员id
        if (userCount === 0 || !context.user?.staffId) {
          await tx.user.update({
            where: { id: context.user?.id! },
            data: {
              staffId: args.input.staffId
            }
          });
        }
      });
      return {
        id: context.user?.id
      };
    }
  }
};

export default userResolver;
