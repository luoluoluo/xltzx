const typeDefs = /* GraphQL */ `
  enum CommissionState {
    created
    completed
  }
  type Commission {
    id: String
    staffId: String
    staff: Staff
    orderId: String
    order: Order
    amount: Float
    state: CommissionState
    completedAt: String
    createdAt: String
  }

  type CommissionPagination {
    edges: [Commission!]
    totalCount: Int!
  }

  input CommissionQuery {
    id: String
    orderId: String
    offset: Int
    limit: Int
    state: CommissionState
    staffId: String
  }

  type Query {
    "分销管理-佣金详情"
    commission(query: CommissionQuery!): Commission
    "分销管理-佣金列表"
    commissions(query: CommissionQuery!): CommissionPagination
  }
`;
export default typeDefs;
