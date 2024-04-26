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
    id: String
    spuId: String
    name: String
    specValues: [SpecValueInput!]
  }

  input SpecNameQuery {
    id: String
    offset: Int
    limit: Int
    spuId: String
  }

  type Query {
    "产品管理-规格名列表"
    specNames(query: SpecNameQuery!): SpecNamePagination
  }
`;
export default typeDefs;
