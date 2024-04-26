const typeDefs = /* GraphQL */ `
  type JsConfig {
    appId: String!
    timestamp: Int!
    nonceStr: String!
    signature: String!
  }
  type Query {
    jsConfig(url: String!): JsConfig
  }
`;
export default typeDefs;
