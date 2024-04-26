const typeDefs = /* GraphQL */ `
  type User {
    id: String
    staffId: String
    staff: Staff
    type: String
    code: String
    name: String
    phone: String
    area: String
    address: String
    createdAt: String
  }

  type UserPagination {
    edges: [User!]
    totalCount: Int!
  }

  input UserInput {
    name: String
    phone: String
  }

  input UserQuery {
    id: String
    offset: Int
    limit: Int
    code: String
    name: String
    staffId: String
  }

  type Query {
    "用户管理-用户详情"
    user(query: UserQuery!): User
    "用户管理-用户列表"
    users(query: UserQuery!): UserPagination
    "分销管理-用户列表"
    distributionUsers(query: UserQuery!): UserPagination
  }
`;
export default typeDefs;
