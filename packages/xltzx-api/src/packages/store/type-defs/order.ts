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
    user: User
    staffId: String
    title: String
    spec: String
    skuId: String
    sku: Sku
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
    createdAt: String
    refundedAt: String
  }

  type OrderPagination {
    edges: [Order!]
    totalCount: Int!
  }

  input OrderInput {
    quantity: Int
    shippingName: String
    shippingPhone: String
    shippingArea: String
    shippingAddress: String
    skuId: String
  }

  input OrderQuery {
    id: String
    offset: Int
    limit: Int
    state: OrderState
  }

  type Query {
    "订单详情"
    order(query: OrderQuery!): Order
    "订单列表"
    orders(query: OrderQuery!): OrderPagination
  }

  type Mutation {
    "创建订单"
    createOrder(input: OrderInput!): Order
    "支付订单"
    payOrder(query: PayOrderQuery!): Pay
    "退款"
    refundOrder(query: OrderQuery!): Order
  }
`;
export default typeDefs;
