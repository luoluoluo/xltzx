const typeDefs = /* GraphQL */ `
  type Staff {
    id: String!
    userId: String
    user: User
    userBindedAt: String
    code: String
    name: String
    password: String
    staffRoles: [StaffRole]
    createdAt: String
  }

  type Token {
    token: String!
    id: String!
  }

  input StaffInput {
    code: String!
    name: String
    password: String
    roleIds: [String]
  }

  type StaffPagination {
    edges: [Staff!]
    totalCount: Int!
  }

  input StaffQuery {
    id: String
    offset: Int
    limit: Int
    name: String
  }

  input UpdatePasswordInput {
    oldPassword: String!
    newPassword: String!
  }

  type Query {
    "我的信息"
    me: Staff
    "系统管理-管理员详情"
    staff(query: StaffQuery!): Staff
    "系统管理-管理员列表"
    staffs(query: StaffQuery!): StaffPagination
  }

  type Mutation {
    "登录"
    login(code: String!, password: String!): Token
    "系统管理-创建管理员"
    createStaff(input: StaffInput!): Staff
    "系统管理-编辑管理员"
    updateStaff(query: StaffQuery!, input: StaffInput!): Staff
    "系统管理-删除管理员"
    deleteStaff(query: StaffQuery!): Staff
    "修改我的密码"
    updateMePassword(input: UpdatePasswordInput!): Staff
  }
`;
export default typeDefs;
