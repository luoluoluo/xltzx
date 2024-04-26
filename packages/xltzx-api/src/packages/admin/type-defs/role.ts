const typeDefs = /* GraphQL */ `
  type Role {
    id: String!
    name: String!
    rolePermissions: [RolePermission]
    createdAt: String
  }

  input RoleInput {
    name: String!
    permissions: [String!]
  }

  type RolePagination {
    edges: [Role!]
    totalCount: Int!
  }

  input RoleQuery {
    id: String
    offset: Int
    limit: Int
  }

  type Query {
    "系统管理-角色详情"
    role(query: RoleQuery!): Role
    "系统管理-角色列表"
    roles(query: RoleQuery!): RolePagination
  }

  type Mutation {
    "系统管理-创建角色"
    createRole(input: RoleInput!): Role
    "系统管理-编辑角色"
    updateRole(query: RoleQuery!, input: RoleInput!): Role
    "系统管理-删除角色"
    deleteRole(query: RoleQuery!): Role
  }
`;
export default typeDefs;
