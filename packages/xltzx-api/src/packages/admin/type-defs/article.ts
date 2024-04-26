const typeDefs = /* GraphQL */ `
  type Article {
    id: String
    fileId: String
    file: File
    title: String
    content: String
    publishedAt: String
    createdAt: String
  }

  type ArticlePagination {
    edges: [Article!]
    totalCount: Int!
  }

  input ArticleInput {
    fileId: String
    title: String
    content: String
  }

  input ArticleQuery {
    id: String
    offset: Int
    limit: Int
  }

  type Query {
    "内容管理-文章详情"
    article(query: ArticleQuery!): Article
    "内容管理-文章列表"
    articles(query: ArticleQuery!): ArticlePagination
  }

  type Mutation {
    "内容管理-新建文章"
    createArticle(input: ArticleInput!): Article
    "内容管理-编辑文章"
    updateArticle(query: ArticleQuery!, input: ArticleInput!): Article
    "内容管理-发布文章"
    publishArticle(query: ArticleQuery!): Article
    "内容管理-取消发布文章"
    unpublishArticle(query: ArticleQuery!): Article
    "内容管理-删除文章"
    deleteArticle(query: ArticleQuery!): Article
  }
`;
export default typeDefs;
