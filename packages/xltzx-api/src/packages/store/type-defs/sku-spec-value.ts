const typeDefs = /* GraphQL */ `
  type SkuSpecValue {
    id: String
    skuId: String
    sku: Sku
    specValueId: String
    specValue: SpecValue
    createdAt: String
  }
  input SkuSpecValueInput {
    skuId: String
    specValueId: String
  }
`;
export default typeDefs;
