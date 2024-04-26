const typeDefs = /* GraphQL */ `
  type SkuFile {
    id: String
    skuId: String
    sku: Sku
    fileId: String
    file: File
    createdAt: String
  }
  input SkuFileInput {
    skuId: String
    fileId: String
  }
`;
export default typeDefs;
