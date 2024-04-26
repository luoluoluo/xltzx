import prisma from "@/core/prisma";
import redisClient from "@/core/redis";
import { genId } from "@/utils";
import { hashPassword, sign } from "@/utils/auth";
import { graphQLError } from "@/utils/graphql";
import { PrismaSelect } from "@paljs/plugins";
import bcrypt from "bcryptjs";
import { Resolvers } from "../generated/graphql";
import { Context } from "../index";

const staffResolver: Resolvers<Context> = {
  Query: {
    async me(_, __, context) {
      return { ...context.staff, password: undefined } as any;
    },
    async staffs(_, args, __, info) {
      const select = new PrismaSelect(info).value;
      const where = {
        id: args.query.id || undefined,
        name: args.query.name || undefined
      };
      const staffs = await prisma.staff.findMany({
        take: args.query?.limit || undefined,
        skip: args.query?.offset || undefined,
        select: select.select.edges.select,
        orderBy: [{ id: "desc" }],
        where
      });
      const count = await prisma.staff.count({ where });
      return {
        totalCount: count,
        edges: staffs as any
      };
    },
    async staff(_, args, __, info) {
      if (!args.query?.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const select = new PrismaSelect(info).value;
      const staff = await prisma.staff.findFirst({
        where: { id: args.query?.id },
        select: select.select
      });
      return staff as any;
    }
  },
  Mutation: {
    async login(_, args) {
      if (!args.code || !args.password) {
        throw graphQLError({ message: "参数错误" });
      }
      const errCountCacheKey = `staff-login-err-${args.code}`;
      const errorCount = Number((await redisClient.get(errCountCacheKey)) || "0");
      if (errorCount >= 6) {
        throw graphQLError({ message: "错误次数过多, 请120秒后重试" });
      }
      const staff = await prisma.staff.findFirst({
        where: { code: args.code }
      });
      if (!staff || !staff.password) {
        throw graphQLError({ message: "无效的用户或密码" });
      }
      const isValid = await bcrypt.compare(args.password, staff.password);
      if (!isValid) {
        redisClient.incr(errCountCacheKey);
        redisClient.expire(errCountCacheKey, 120);
        throw graphQLError({ message: "无效的用户或密码" });
      }
      const token = sign(staff.id, staff.password);
      return {
        id: staff.id,
        token
      };
    },
    async createStaff(_, args) {
      if (!args.input?.code || !args.input?.name || !args.input?.password) {
        throw graphQLError({ message: "参数错误" });
      }
      const hashedPassword = await hashPassword(args.input?.password);
      const createdStaff = await prisma.staff.create({
        data: {
          id: genId(),
          code: args.input?.code,
          name: args.input?.name,
          password: hashedPassword,
          staffRoles: {
            create: (args.input.roleIds || []).map(roleId => ({
              id: genId(),
              roleId: roleId!
            }))
          }
        }
      });

      return createdStaff as any;
    },
    async updateStaff(_, args) {
      if (!args.query?.id) {
        throw graphQLError({ message: "参数错误" });
      }
      let hashedPassword: string | undefined = undefined;
      if (args.input?.password) {
        hashedPassword = await hashPassword(args.input.password);
      }
      const updatedStaff = await prisma.$transaction(async tx => {
        await tx.staffRole.deleteMany({
          where: { staffId: args.query.id! }
        });
        return await tx.staff.update({
          where: { id: args.query.id! },
          data: {
            code: args.input?.code || undefined,
            name: args.input?.name || undefined,
            password: hashedPassword,
            staffRoles: {
              create: (args.input?.roleIds || [])?.map(roleId => ({
                id: genId(),
                roleId: roleId!
              }))
            }
          }
        });
      });
      return updatedStaff as any;
    },
    async deleteStaff(_, args) {
      if (!args.query?.id) {
        throw graphQLError({ message: "参数错误" });
      }
      const deletedStaff = await prisma.$transaction(async tx => {
        await tx.staffRole.deleteMany({
          where: { staffId: args.query?.id! }
        });
        return await tx.staff.delete({
          where: { id: args.query?.id! }
        });
      });
      return deletedStaff as any;
    },
    async updateMePassword(_, args, context) {
      if (!args.input?.newPassword) {
        throw graphQLError({ message: "参数错误" });
      }
      // 检验oldpassword
      const isValid = await bcrypt.compare(args.input.oldPassword, context.staff?.password!);
      // console.log(args.input.oldPassword, context.staff?.password!);
      if (!isValid) {
        throw graphQLError({ message: "密码错误" });
      }

      const updatedStaff = await prisma.staff.update({
        where: { id: context.staff?.id },
        data: {
          password: await hashPassword(args.input.newPassword)
        }
      });
      return updatedStaff as any;
    }
  }
};

export default staffResolver;
