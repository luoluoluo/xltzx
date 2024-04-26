const typeDefs = /* GraphQL */ `
  type Refund {
    id: String
    orderId: String
    order: Order
    amount: Float
    createdAt: String
  }
  input RefundInput {
    amount: Float
  }
`;
export default typeDefs;
