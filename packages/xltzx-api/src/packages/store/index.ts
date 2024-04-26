import { getLogger } from "@/core/logger";
import { graphQLError, loadResolvers, loadTypeDefs } from "@/utils/graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Express } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { User } from "./generated/graphql";
import { auth } from "./middleware";

export interface Context extends Record<PropertyKey, unknown> {
  token?: string;
  user?: User;
}

export const startServer = async (app: Express) => {
  const typeDefs = await loadTypeDefs(`${__dirname}/type-defs`);
  const resolvers = await loadResolvers(`${__dirname}/resolvers`);
  app.use("/store", auth, (req, res, next) => {
    try {
      createHandler<Context>({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        rootValue: resolvers,
        context: {
          token: req.app.get("token"),
          user: req.app.get("user")
        }
      })(req, res, next);
    } catch (e) {
      getLogger().error(e, "系统错误");
      return res.send({ errors: [graphQLError({ message: "系统错误" })] });
    }
  });
};
