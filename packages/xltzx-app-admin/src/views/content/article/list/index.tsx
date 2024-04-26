import { can } from "@/utils/auth";
import { Table, Button, Space, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Article, ArticlePagination, ArticleQuery } from "@/generated/graphql";
import { FileAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { getFileUrl } from "@/utils";

const Index = () => {
  const navigate = useNavigate();
  // const [offset, setOffset] = useState(0);
  // const limit = 10;
  const [articleQuery, setArticleQuery] = useState<ArticleQuery>({
    offset: 0,
    limit: 5
  });
  const [articlePagination, setArticlePagination] = useState<ArticlePagination>();
  const loadArticleData = async () => {
    console.log("loadArticleData");
    const articleRes = await apolloClient.query<{ articles: ArticlePagination }>({
      query: gql(/* GraphQL */ `
        query Articles($query: ArticleQuery!) {
          articles(query: $query) {
            edges {
              id
              title
              fileId
              publishedAt
              createdAt
            }
            totalCount
          }
        }
      `),
      variables: { query: articleQuery },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (articleRes.errors) {
      message.error(articleRes.errors[0].message);
      return;
    }
    setArticlePagination(articleRes.data.articles);
  };
  useEffect(() => {
    loadArticleData();
  }, [articleQuery]);

  const columns: any[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      fixed: "left"
    },
    {
      title: "标题",
      dataIndex: "title",
      className: "ant-table-cell-ellipsis",
      key: "title",
      align: "center"
    },
    {
      title: "封面图",
      dataIndex: "fileId",
      className: "ant-table-cell-ellipsis",
      key: "fileId",
      align: "center",
      render: (_: any, item: Article) => (
        <>
          <img className="h-10 w-auto" src={getFileUrl(item?.fileId || "")} />
        </>
      )
    },
    {
      title: "发布时间",
      dataIndex: "publishedAt",
      className: "ant-table-cell-ellipsis",
      key: "publishedAt",
      align: "center",
      render: (_: any, item: Article) => (
        <>{item.publishedAt ? dayjs(Number(item.publishedAt)).format("YYYY-MM-DD HH:mm:ss") : "未发布"}</>
      )
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      className: "ant-table-cell-ellipsis",
      key: "createdAt",
      align: "center",
      render: (_: any, item: Article) => <>{dayjs(Number(item.createdAt)).format("YYYY-MM-DD HH:mm:ss")}</>
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      render: (_: any, article: Article) => (
        <Space size="small" direction="vertical">
          {can("mutation.updateArticle") ? (
            <Button
              size="small"
              onClick={() => {
                navigate(`/content/article/edit?id=${article.id}`);
              }}
            >
              编辑
            </Button>
          ) : null}
          {!article.publishedAt && can("mutation.publishArticle") ? (
            <Popconfirm
              title="发布"
              description="确认发布？"
              onConfirm={async () => {
                const res = await apolloClient.mutate({
                  mutation: gql(/* GraphQL */ `
                    mutation PublishArticle($query: ArticleQuery!) {
                      publishArticle(query: $query) {
                        id
                      }
                    }
                  `),
                  variables: {
                    query: {
                      id: article.id
                    }
                  },
                  errorPolicy: "all"
                });
                if (res.errors) {
                  message.error(res.errors[0].message);
                  return;
                }
                loadArticleData();
              }}
            >
              <Button size="small">发布</Button>
            </Popconfirm>
          ) : null}
          {article.publishedAt && can("mutation.unpublishArticle") ? (
            <Popconfirm
              title="取消发布"
              description="确认取消发布？"
              onConfirm={async () => {
                const res = await apolloClient.mutate({
                  mutation: gql(/* GraphQL */ `
                    mutation UnpublishArticle($query: ArticleQuery!) {
                      unpublishArticle(query: $query) {
                        id
                      }
                    }
                  `),
                  variables: {
                    query: {
                      id: article.id
                    }
                  },
                  errorPolicy: "all"
                });
                if (res.errors) {
                  message.error(res.errors[0].message);
                  return;
                }
                loadArticleData();
              }}
            >
              <Button danger size="small">
                取消发布
              </Button>
            </Popconfirm>
          ) : null}
          {can("mutation.deleteArticle") ? (
            <Popconfirm
              title="删除"
              description="确认删除"
              onConfirm={async () => {
                const deleteArticleRes = await apolloClient.mutate({
                  mutation: gql(/* GraphQL */ `
                    mutation DeleteArticle($query: ArticleQuery!) {
                      deleteArticle(query: $query) {
                        id
                      }
                    }
                  `),
                  variables: {
                    query: {
                      id: article.id
                    }
                  },
                  errorPolicy: "all"
                });
                if (deleteArticleRes.errors) {
                  message.error(deleteArticleRes.errors[0].message);
                  return;
                }
                loadArticleData();
              }}
            >
              <Button danger size="small">
                删除
              </Button>
            </Popconfirm>
          ) : null}
        </Space>
      )
    }
  ];
  return (
    <div className="card content-box">
      <div className="flex justify-end">
        {can("mutation.createArticle") ? (
          <Button
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              navigate(`/content/article/add`);
            }}
          >
            新建
          </Button>
        ) : null}
      </div>
      <Table
        scroll={{ x: true }}
        className="mt-4"
        bordered={true}
        pagination={{
          current: articleQuery.offset! / articleQuery.limit! + 1,
          pageSize: articleQuery.limit!,
          total: articlePagination?.totalCount,
          onChange: article => {
            setArticleQuery({ ...articleQuery, offset: (article - 1) * articleQuery.limit! });
          }
        }}
        rowKey="id"
        dataSource={articlePagination?.edges || []}
        columns={columns}
      />
    </div>
  );
};

export default Index;
