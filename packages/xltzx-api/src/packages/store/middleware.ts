import prisma from "@/core/prisma";
import { verify } from "@/utils/auth";
import { graphQLError } from "@/utils/graphql";
import { NextFunction, Request, Response } from "express";
import { parse } from "graphql";
import { ignoreAuthPermissions } from "./variables/permission";
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
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = String(req.headers.token || "");
  req.app.set("token", token);
  // queryPermissions
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

  const tokenUser = verify(token);
  if (!tokenUser) {
    return res.send({ errors: [graphQLError({ message: "UNAUTHENTICATED", code: "UNAUTHENTICATED" })] });
    return { body: graphQLError({ message: "UNAUTHENTICATED", code: "UNAUTHENTICATED" }) };
    // throw graphQLError({ message: "UNAUTHENTICATED", code: "UNAUTHENTICATED" });
  }

  const user = await prisma.user.findFirst({
    where: { id: tokenUser?.id || "" }
  });
  if (!user) {
    return res.send({ errors: [graphQLError({ message: "UNAUTHENTICATED", code: "UNAUTHENTICATED" })] });
  }
  if (tokenUser?.password !== user?.code) {
    return res.send({ errors: [graphQLError({ message: "UNAUTHENTICATED", code: "UNAUTHENTICATED" })] });
  }
  req.app.set("user", user);
  return next();
};
