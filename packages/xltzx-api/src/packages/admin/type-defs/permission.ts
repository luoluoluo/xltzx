const typeDefs = /* GraphQL */ `
  type Permission {
    name: String
    value: String!
  }

  type PermissionPagination {
    edges: [Permission!]
    totalCount: Int!
  }

  type Query {
    "系统管理-权限列表"
    permissions: PermissionPagination
  }
`;
export default typeDefs;
