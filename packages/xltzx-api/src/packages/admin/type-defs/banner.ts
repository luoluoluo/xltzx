const typeDefs = /* GraphQL */ `
  type Banner {
    id: String
    fileId: String
    title: String
    link: String
    sort: Int
    createdAt: String
  }

  type BannerPagination {
    edges: [Banner!]
    totalCount: Int!
  }

  input BannerInput {
    fileId: String
    title: String
    link: String
    sort: Int
  }

  input BannerQuery {
    id: String
    offset: Int
    limit: Int
  }

  type Query {
    "内容管理-banner详情"
    banner(query: BannerQuery!): Banner
    "内容管理-banner列表"
    banners(query: BannerQuery!): BannerPagination
  }

  type Mutation {
    "内容管理-新建banner"
    createBanner(input: BannerInput!): Banner
    "内容管理-编辑banner"
    updateBanner(query: BannerQuery!, input: BannerInput!): Banner
    "内容管理-删除banner"
    deleteBanner(query: BannerQuery!): Banner
  }
`;
export default typeDefs;
