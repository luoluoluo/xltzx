import { graphQLError } from "@/utils/graphql";
import { NextFunction, Request, Response } from "express";
import { ignoreAclPermissions, ignoreAuthPermissions } from "./variables/permission";
// import { Staff } from "@prisma/client";
import prisma from "@/core/prisma";
import { genId } from "@/utils";
import { verify } from "@/utils/auth";
import { parse } from "graphql";

export const ignoreAuth = (queryPermissions: string[]) => {
  let ignore = true;
  queryPermissions.map(permission => {
    if (!ignoreAuthPermissions.includes(permission)) {
      ignore = false;
      return;
    }
  });
  return ignore;
};

export const ignoreAcl = (queryPermissions: string[]) => {
  let ignore = true;
  queryPermissions.map(permission => {
    if (!ignoreAclPermissions.includes(permission)) {
      ignore = false;
      return;
    }
  });
  return ignore;
};
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = String(req.headers.token || "");
  req.app.set("token", token);
  const parsedQuery = parse(req.body.query);
  const queryPermissions: string[] = [];
  parsedQuery.definitions.map((definition: any) => {
    const operation = definition.operation;
    if (!operation) return;
    definition.selectionSet.selections.map((selection: any) => {
      const name = selection.name.value;
      queryPermissions.push(`${operation}.${name}`);
    });
  });

  // ignore auth
  if (ignoreAuth(queryPermissions)) {
    return next();
  }

  if (!token) {
    return res.send({ errors: [graphQLError({ message: "UNAUTHENTICATED", code: "UNAUTHENTICATED" })] });
  }

  const tokenStaff = verify(token);
  if (!tokenStaff) {
    return res.send({ errors: [graphQLError({ message: "UNAUTHENTICATED", code: "UNAUTHENTICATED" })] });
  }

  const staff = await prisma.staff.findFirst({
    where: { id: tokenStaff?.id || "" },
    include: {
      staffRoles: {
        include: {
          role: {
            include: {
              rolePermissions: true
            }
          }
        }
      }
    }
  });
  if (!staff) {
    return res.send({ errors: [graphQLError({ message: "UNAUTHENTICATED", code: "UNAUTHENTICATED" })] });
  }
  if (tokenStaff?.password !== staff?.password) {
    return res.send({ errors: [graphQLError({ message: "UNAUTHENTICATED", code: "UNAUTHENTICATED" })] });
  }

  req.app.set("staff", staff);

  // 记录日志
  prisma.staffOperation
    .create({
      data: {
        id: genId(),
        staffId: staff.id,
        content: JSON.stringify(req.body)
      }
    })
    .catch(e => {
      console.log(e);
    });

  // ignore acl
  if (ignoreAcl(queryPermissions)) {
    return next();
  }
  // acl
  const hasPermissions: string[] = [];
  staff.staffRoles.map(staffRole => {
    staffRole.role.rolePermissions.map(rolePermission => {
      hasPermissions.push(rolePermission.permission);
    });
  });

  if (hasPermissions.includes("*")) {
    return next();
  }

  for (const queryPermission of queryPermissions) {
    if (!hasPermissions.includes(queryPermission)) {
      return res.send({ errors: [graphQLError({ message: "无权访问", code: "FORBIDDEN" })] });
    }
  }
  return next();
};
