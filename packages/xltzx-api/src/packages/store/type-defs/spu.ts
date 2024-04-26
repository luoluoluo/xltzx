const typeDefs = /* GraphQL */ `
  type Spu {
    id: String
    fileId: String
    file: File
    title: String
    content: String
    skuId: String
    sku: Sku
    skus: [Sku!]
    specNames(orderBy: [OrderByInput]): [SpecName!]
    specValues: [SpecValue!]
    attrs: [Attr!]
    publishedAt: String
  }

  type SpuPagination {
    edges: [Spu!]
    totalCount: Int!
  }

  input SpuInput {
    title: String
    content: String
  }

  input SpuQuery {
    id: String
    offset: Int
    limit: Int
  }

  type Query {
    "产品详情"
    spu(query: SpuQuery!): Spu
    "产品列表"
    spus(query: SpuQuery!): SpuPagination
  }
`;
export default typeDefs;
