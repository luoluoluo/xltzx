const typeDefs = /* GraphQL */ `
  type SpecValue {
    id: String
    spuId: String
    spu: Spu
    specNameId: String
    specName: SpecName
    value: String
    createdAt: String
  }

  type SpecValuePagination {
    edges: [SpecValue!]
    totalCount: Int!
  }

  input SpecValueInput {
    spuId: String
    specNameId: String
    value: String
  }

  input SpecValueQuery {
    id: String
    offset: Int
    limit: Int
  }
`;
export default typeDefs;
