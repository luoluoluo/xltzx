const typeDefs = /* GraphQL */ `
  enum PayType {
    wechatJsApi
  }
  type PayWechatJsapi {
    appId: String
    timeStamp: String
    nonceStr: String
    package: String
    signType: String
    paySign: String
  }
  type Pay {
    wechatJsapi: PayWechatJsapi
  }
  input PayOrderQuery {
    orderId: String!
    type: PayType
  }
`;
export default typeDefs;
