const typeDefs = /* GraphQL */ `
  enum OrderState {
    created
    paid
    shipped
    completed
    canceled
    refunded
  }
  type Order {
    id: String
    type: SkuType
    userId: String
    skuId: String
    sku: Sku
    user: User
    staffId: String
    staff: Staff
    title: String
    spec: String
    fileId: String
    file: File
    price: Float
    quantity: Int
    amount: Float
    commissionAmount: Float
    shippingName: String
    shippingPhone: String
    shippingArea: String
    shippingAddress: String
    expressCompany: String
    expressCode: String
    state: OrderState
    paidAt: String
    shippedAt: String
    canceledAt: String
    completedAt: String
    refundedAt: String
    createdAt: String
  }

  type OrderPagination {
    edges: [Order!]
    totalCount: Int!
  }

  input OrderInput {
    shippingName: String
    shippingPhone: String
    shippingArea: String
    shippingAddress: String
    expressCompany: String
    expressCode: String
  }

  input OrderQuery {
    id: String
    userId: String
    offset: Int
    limit: Int
    state: OrderState
    staffId: String
  }

  type Query {
    "订单管理-订单详情"
    order(query: OrderQuery!): Order
    "订单管理-订单列表"
    orders(query: OrderQuery!): OrderPagination
    "分销管理-订单列表"
    distributionOrders(query: OrderQuery!): OrderPagination
  }

  type Mutation {
    "订单管理-发货"
    shipOrder(query: OrderQuery!, input: OrderInput!): Order
    "订单管理-退款"
    refundOrder(query: OrderQuery!, input: RefundInput!): Order
  }
`;
export default typeDefs;
