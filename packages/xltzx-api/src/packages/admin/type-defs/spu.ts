const typeDefs = /* GraphQL */ `
  type Spu {
    id: String
    fileId: String
    file: File
    title: String
    content: String
    publishedAt: String
    sort: Int
    createdAt: String
    skuId: String
    sku: Sku
    skus: [Sku!]
    specNames: [SpecName!]
    specValues: [SpecValue!]
    attrs: [Attr!]
  }

  type SpuPagination {
    edges: [Spu!]
    totalCount: Int!
  }

  input SpuInput {
    title: String
    content: String
    sort: Int
    fileId: String
    skuId: String
    attrs: [AttrInput!]
    specNames: [SpecNameInput!]
  }

  input SpuQuery {
    id: String
    offset: Int
    limit: Int
  }

  type Query {
    "产品管理-产品详情"
    spu(query: SpuQuery!): Spu
    "产品管理-产品列表"
    spus(query: SpuQuery!): SpuPagination
    "分销管理-产品列表"
    distributionSpus(query: SpuQuery!): SpuPagination
  }

  type Mutation {
    "产品管理-新建产品"
    createSpu(input: SpuInput!): Spu
    "产品管理-编辑产品"
    updateSpu(query: SpuQuery!, input: SpuInput!): Spu
    "产品管理-删除产品"
    deleteSpu(query: SpuQuery!): Spu
    "产品管理-上架产品"
    publishSpu(query: SpuQuery!): Spu
    "产品管理-下架产品"
    unpublishSpu(query: SpuQuery!): Spu
    "产品管理-设置默认sku"
    setDefaultSku(query: SpuQuery!, input: SpuInput!): Spu
  }
`;
export default typeDefs;
