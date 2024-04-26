const typeDefs = /* GraphQL */ `
  type Article {
    id: String
    fileId: String
    file: File
    title: String
    content: String
    createdAt: String
  }

  type ArticlePagination {
    edges: [Article!]
    totalCount: Int!
  }

  input ArticleQuery {
    id: String
    fileId: String
    offset: Int
    limit: Int
  }

  type Query {
    "页面详情"
    article(query: ArticleQuery!): Article
    "页面列表"
    articles(query: ArticleQuery!): ArticlePagination
  }
`;
export default typeDefs;
