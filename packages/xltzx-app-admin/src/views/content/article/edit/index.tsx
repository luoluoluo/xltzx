import { useEffect, useState } from "react";
import Form from "../_components/form";
import { Article } from "@/generated/graphql";
import { apolloClient } from "@/utils/request";
import { gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { message } from "antd";
const Index = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [article, setArticle] = useState<Article>();
  const loadArticleData = async () => {
    const articleRes = await apolloClient.query<{ article: Article }>({
      query: gql(/* GraphQL */ `
        query Article($query: ArticleQuery!) {
          article(query: $query) {
            id
            title
            content
            fileId
          }
        }
      `),
      variables: { query: { id } },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (articleRes.errors) {
      message.error(articleRes.errors[0].message);
      return;
    }
    setArticle(articleRes.data.article);
  };
  useEffect(() => {
    loadArticleData();
  }, []);
  if (!article) return <></>;
  return (
    <div className="p-4 bg-white">
      <Form article={article}></Form>
    </div>
  );
};

export default Index;
