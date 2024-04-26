const typeDefs = /* GraphQL */ `
  type Banner {
    id: String
    fileId: String
    title: String
    link: String
  }

  type BannerPagination {
    edges: [Banner!]
    totalCount: Int!
  }

  input BannerQuery {
    id: String
    offset: Int
    limit: Int
  }

  type Query {
    "banner详情"
    banner(query: BannerQuery!): Banner
    "banner列表"
    banners(query: BannerQuery!): BannerPagination
  }
`;
export default typeDefs;
