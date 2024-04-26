const typeDefs = /* GraphQL */ `
  type SpecName {
    id: String
    spuId: String
    spu: Spu
    name: String
    createdAt: String
    specValues: [SpecValue!]
  }

  type SpecNamePagination {
    edges: [SpecName!]
    totalCount: Int!
  }

  input SpecNameInput {
    spuId: String
    name: String
  }

  input SpecNameQuery {
    id: String
    offset: Int
    limit: Int
    spuId: String
  }
`;
export default typeDefs;
