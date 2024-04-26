import { loadTypeDefs } from "@/utils/graphql";
import { parse } from "graphql";
import { Permission, Resolvers } from "../generated/graphql";
import { Context } from "../index";
import { ignoreAclPermissions } from "../variables/permission";

const permissionResolver: Resolvers<Context> = {
  Query: {
    async permissions() {
      const typeDefs = await loadTypeDefs(`${__dirname}/../type-defs`);
      const permissions: Permission[] = [];
      const parsedTypeDefs = parse(typeDefs);
      parsedTypeDefs.definitions.map((definition: any) => {
        const definitionName = (definition.name.value as string).toLowerCase();
        if (!["query", "mutation"].includes(definitionName)) return;
        definition.fields.map((field: any) => {
          const value = `${definitionName}.${field.name.value}`;
          const name = field.description?.value || "";
          if (ignoreAclPermissions.includes(value)) return;
          permissions.push({
            name,
            value
          });
        });
      });
      permissions.sort((a, b) => {
        return a.name!.localeCompare(b.name!, "zh-Hans-CN", { sensitivity: "accent" });
      });
      permissions.unshift({
        value: "*",
        name: "全部权限"
      });
      return {
        totalCount: permissions.length,
        edges: permissions
      };
    }
  },
  Mutation: {}
};
export default permissionResolver;
