import { can } from "@/utils/auth";
import { Table, Button, Space, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Sku, SkuPagination, SkuQuery } from "@/generated/graphql";
import { FileAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  // const [offset, setOffset] = useState(0);
  // const limit = 10;
  const [skuQuery, setSkuQuery] = useState<SkuQuery>({
    offset: 0,
    limit: 5
  });
  const [skuPagination, setSkuPagination] = useState<SkuPagination>();
  const loadSkuData = async () => {
    console.log("loadSkuData");
    const skuRes = await apolloClient.query<{ skus: SkuPagination }>({
      query: gql(/* GraphQL */ `
        query Skus($query: SkuQuery!) {
          skus(query: $query) {
            edges {
              id
              title
              skuFiles {
                fileId
              }
              content
              createdAt
            }
            totalCount
          }
        }
      `),
      variables: { query: skuQuery },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (skuRes.errors) {
      message.error(skuRes.errors[0].message);
      return;
    }
    setSkuPagination(skuRes.data.skus);
  };
  useEffect(() => {
    loadSkuData();
  }, [skuQuery]);

  const columns: any[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      fixed: "left"
    },
    // {
    //   title: "标题",
    //   dataIndex: "title",
    //   className: "ant-table-cell-ellipsis",
    //   key: "title",
    //   align: "center"
    // },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      className: "ant-table-cell-ellipsis",
      key: "createdAt",
      align: "center",
      render: (_: any, item: Sku) => <>{dayjs(Number(item.createdAt)).format("YYYY-MM-DD HH:mm:ss")}</>
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      render: (_: any, sku: Sku) => (
        <Space size="small" direction="vertical">
          {can("mutation.updateSku") ? (
            <Button
              size="small"
              onClick={() => {
                navigate(`/product/sku/edit?id=${sku.id}`);
              }}
            >
              编辑
            </Button>
          ) : null}
          {can("mutation.deleteSku") ? (
            <Popconfirm
              title="删除"
              description="确认删除"
              onConfirm={async () => {
                const deleteSkuRes = await apolloClient.mutate({
                  mutation: gql(/* GraphQL */ `
                    mutation DeleteSku($query: SkuQuery!) {
                      deleteSku(query: $query) {
                        id
                      }
                    }
                  `),
                  variables: {
                    query: {
                      id: sku.id
                    }
                  },
                  errorPolicy: "all"
                });
                if (deleteSkuRes.errors) {
                  message.error(deleteSkuRes.errors[0].message);
                  return;
                }
                loadSkuData();
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
        {can("mutation.createSku") ? (
          <Button
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              navigate(`/product/sku/add`);
            }}
          >
            新建
          </Button>
        ) : null}
      </div>
      <Table
        scroll={{ x: true }}
        expandable={{ childrenColumnName: "childrens", indentSize: 32 }}
        className="mt-4"
        bordered={true}
        pagination={{
          current: skuQuery.offset! / skuQuery.limit! + 1,
          pageSize: skuQuery.limit!,
          total: skuPagination?.totalCount,
          onChange: page => {
            setSkuQuery({ ...skuQuery, offset: (page - 1) * skuQuery.limit! });
          }
        }}
        rowKey="id"
        dataSource={skuPagination?.edges || []}
        columns={columns}
      />
    </div>
  );
};

export default Index;
