const typeDefs = /* GraphQL */ `
  enum UserType {
    wechat
    phone
  }
  type User {
    id: String
    staffId: String
    type: UserType
    code: String
    name: String
    phone: String
    area: String
    address: String
    createdAt: String
  }

  input UserInput {
    name: String
    phone: String
    area: String
    address: String
    staffId: String
  }

  type UserPagination {
    edges: [User!]
    totalCount: Int!
  }

  input LoginInput {
    type: UserType
    code: String
    loginKey: String
  }

  input UserQuery {
    id: String
    offset: Int
    limit: Int
    code: String
    name: String
  }

  type Token {
    token: String!
    id: String!
  }

  input LoginKeyQuery {
    type: UserType!
  }

  type LoginKey {
    type: UserType!
    loginKey: String!
  }

  type Query {
    "我的信息"
    me: User
    loginKey(query: LoginKeyQuery!): LoginKey
  }

  type Mutation {
    "登录"
    login(input: LoginInput!): Token
    "登录"
    loginWithKey(input: LoginInput!): Token
    updateMe(input: UserInput!): User
    bindStaff(input: UserInput!): User
  }
`;
export default typeDefs;
