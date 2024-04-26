const typeDefs = /* GraphQL */ `
  enum SkuType {
    physical
    virtual
  }
  type Sku {
    id: String
    type: SkuType
    spuId: String
    title: String
    fileId: String
    file: File
    spu: Spu
    stock: Int
    price: Float
    skuFiles: [SkuFile!]
    skuSpecValues(orderBy: [OrderByInput]): [SkuSpecValue!]
    createdAt: String
  }

  type SkuPagination {
    edges: [Sku!]
    totalCount: Int!
  }

  input SkuQuery {
    id: String
    offset: Int
    limit: Int
    spuId: String
  }

  type Query {
    "sku详情"
    sku(query: SkuQuery!): Sku
    "sku列表"
    skus(query: SkuQuery!): SkuPagination
  }
`;
export default typeDefs;
