import { graphQLError, loadResolvers, loadTypeDefs } from "@/utils/graphql";
import { Express } from "express";
import { Staff } from "./generated/graphql";
// import { Staff } from "@prisma/client";
import { getLogger } from "@/core/logger";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createHandler } from "graphql-http/lib/use/express";
import { auth } from "./middleware";

export interface Context extends Record<PropertyKey, unknown> {
  token?: string;
  staff?: Staff;
}

export const startServer = async (app: Express) => {
  const typeDefs = await loadTypeDefs(`${__dirname}/type-defs`);
  const resolvers = await loadResolvers(`${__dirname}/resolvers`);
  app.use("/admin", auth, (req, res, next) => {
    try {
      return createHandler<Context>({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        rootValue: resolvers,
        context: {
          token: req.app.get("token"),
          staff: req.app.get("staff")
        }
      })(req, res, next);
    } catch (e) {
      getLogger().error(e, "系统错误");
      return res.send({ errors: [graphQLError({ message: "系统错误" })] });
    }
  });
};
