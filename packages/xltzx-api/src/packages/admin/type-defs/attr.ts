const typeDefs = /* GraphQL */ `
  type Attr {
    id: String
    spuId: String
    spu: Spu
    name: String
    value: String
    createdAt: String
  }

  type AttrPagination {
    edges: [Attr!]
    totalCount: Int!
  }

  input AttrInput {
    spuId: String
    name: String
    value: String
  }
`;
export default typeDefs;
