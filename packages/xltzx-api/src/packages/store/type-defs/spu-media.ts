const typeDefs = /* GraphQL */ `
  type SpuMedia {
    id: String
    spuId: String
    spu: Spu
    fileId: String
    file: File
    createdAt: String
  }
  input SpuMediaInput {
    spuId: String
    fileId: String
  }
`;
export default typeDefs;
