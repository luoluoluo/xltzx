// try {
//     const jsConfig = await getJsConfig(String(req.query.url || ""));
//     res.json(jsConfig);
//   } catch (e) {
//     res.json();
//   }

import { getJsConfig } from "@/utils/wechat";
import { Resolvers } from "../generated/graphql";
import { Context } from "../index";

const wechatResolver: Resolvers<Context> = {
  Query: {
    async jsConfig(_, args, __, info) {
      const jsConfig = await getJsConfig(args.url);
      return jsConfig;
    }
  }
};

export default wechatResolver;
