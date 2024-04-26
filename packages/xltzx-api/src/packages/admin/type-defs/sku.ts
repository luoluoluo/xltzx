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
    commissionPrice: Float
    skuFiles: [SkuFile!]
    skuSpecValues: [SkuSpecValue!]
    createdAt: String
  }

  type SkuPagination {
    edges: [Sku!]
    totalCount: Int!
  }

  input SkuInput {
    type: SkuType
    spuId: String
    title: String
    fileId: String
    stock: Int
    price: Float
    commissionPrice: Float
    skuFiles: [SkuFileInput!]
    skuSpecValues: [SkuSpecValueInput!]
  }

  input SkuQuery {
    id: String
    offset: Int
    limit: Int
    spuId: String
  }

  type Query {
    "产品管理-sku详情"
    sku(query: SkuQuery!): Sku
    "产品管理-sku列表"
    skus(query: SkuQuery!): SkuPagination
  }

  type Mutation {
    "产品管理-新建sku"
    createSku(input: SkuInput!): Sku
    "产品管理-编辑sku"
    updateSku(query: SkuQuery!, input: SkuInput!): Sku
    "产品管理-删除sku"
    deleteSku(query: SkuQuery!): Sku
  }
`;
export default typeDefs;
