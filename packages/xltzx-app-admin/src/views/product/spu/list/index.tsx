import { can } from "@/utils/auth";
import { Table, Button, Space, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Sku, Spu, SpuPagination, SpuQuery } from "@/generated/graphql";
import { FileAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { getFileUrl } from "@/utils";

const Index = () => {
  const navigate = useNavigate();
  // const [offset, setOffset] = useState(0);
  // const limit = 10;
  const [spuQuery, setSpuQuery] = useState<SpuQuery>({
    offset: 0,
    limit: 5
  });
  const [spuPagination, setSpuPagination] = useState<SpuPagination>();
  const loadSpuData = async () => {
    console.log("loadSpuData");
    const spuRes = await apolloClient.query<{ spus: SpuPagination }>({
      query: gql(/* GraphQL */ `
        query Spus($query: SpuQuery!) {
          spus(query: $query) {
            edges {
              id
              fileId
              skuId
              title
              sort
              skus {
                id
                spuId
                price
                commissionPrice
                stock
                skuSpecValues {
                  id
                  specValue {
                    specName {
                      name
                    }
                    value
                  }
                }
                createdAt
              }
              content
              publishedAt
              createdAt
            }
            totalCount
          }
        }
      `),
      variables: { query: spuQuery },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (spuRes.errors) {
      message.error(spuRes.errors[0].message);
      return;
    }
    setSpuPagination(spuRes.data.spus);
  };
  useEffect(() => {
    loadSpuData();
  }, [spuQuery]);

  const expandedRowRender = (record: Spu) => {
    const columns: any = [
      {
        title: "SKU ID",
        dataIndex: "id",
        key: "id",
        align: "center",
        fixed: "left"
      },
      {
        title: "规格",
        dataIndex: "skuSpecValues",
        className: "ant-table-cell-ellipsis",
        key: "skuSpecValues",
        align: "center",
        render: (_: any, item: Sku) => (
          <>
            {item.skuSpecValues?.map(v => {
              return (
                <div key={v.id}>
                  {v.specValue?.specName?.name}: {v.specValue?.value}
                </div>
              );
            })}
          </>
        )
      },
      {
        title: "销售价",
        dataIndex: "price",
        className: "ant-table-cell-ellipsis",
        key: "price",
        align: "center",
        render: (_: any, item: Sku) => <>{item.price}</>
      },
      {
        title: "佣金",
        dataIndex: "commissionPrice",
        className: "ant-table-cell-ellipsis",
        key: "commissionPrice",
        align: "center",
        render: (_: any, item: Sku) => (
          <>{`${item.commissionPrice} (${((item.commissionPrice! / item.price!) * 100).toFixed(2)}%)`}</>
        )
      },
      {
        title: "库存",
        dataIndex: "stock",
        className: "ant-table-cell-ellipsis",
        key: "stock",
        align: "center",
        render: (_: any, item: Sku) => <>{item.stock}</>
      },
      {
        title: "是否默认sku",
        dataIndex: "stock",
        className: "ant-table-cell-ellipsis",
        key: "stock",
        align: "center",
        render: (_: any, item: Sku) => <>{record.skuId === item.id ? "是" : "否"}</>
      },
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
        render: (_: any, item: Sku) => (
          <Space size="small" direction="vertical">
            {record.skuId !== item.id && can("mutation.updateSpu") ? (
              <Popconfirm
                title="设为默认sku"
                description="确认设为默认sku"
                onConfirm={async () => {
                  const res = await apolloClient.mutate({
                    mutation: gql(/* GraphQL */ `
                      mutation SetDefaultSku($query: SpuQuery!, $input: SpuInput!) {
                        setDefaultSku(query: $query, input: $input) {
                          id
                        }
                      }
                    `),
                    variables: {
                      query: {
                        id: item.spuId
                      },
                      input: {
                        skuId: item.id
                      }
                    },
                    errorPolicy: "all"
                  });
                  if (res.errors) {
                    message.error(res.errors[0].message);
                    return;
                  }
                  loadSpuData();
                }}
              >
                <Button size="small">设为默认sku</Button>
              </Popconfirm>
            ) : null}
            {can("mutation.updateSku") ? (
              <Button
                size="small"
                onClick={() => {
                  navigate(`/product/sku/edit?id=${item.id}`);
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
                        id: item.id
                      }
                    },
                    errorPolicy: "all"
                  });
                  if (deleteSkuRes.errors) {
                    message.error(deleteSkuRes.errors[0].message);
                    return;
                  }
                  loadSpuData();
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
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={record.skus?.map((v: any) => ({ ...v, key: v.id }))}
        pagination={false}
      />
    );
  };

  const columns: any[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      fixed: "left"
    },
    {
      title: "主图",
      dataIndex: "name",
      className: "ant-table-cell-ellipsis",
      key: "name",
      align: "center",
      render: (_: any, item: Spu) => (
        <>
          <img className="h-10 w-auto" src={getFileUrl(item?.fileId || "")} />
        </>
      )
    },
    {
      title: "标题",
      dataIndex: "title",
      className: "ant-table-cell-ellipsis",
      key: "title",
      align: "center"
    },
    {
      title: "上架时间",
      dataIndex: "publishedAt",
      className: "ant-table-cell-ellipsis",
      key: "publishedAt",
      align: "center",
      render: (_: any, item: Spu) => (
        <>{item.publishedAt ? dayjs(Number(item.publishedAt)).format("YYYY-MM-DD HH:mm:ss") : "未上架"}</>
      )
    },
    {
      title: "排序",
      dataIndex: "sort",
      className: "ant-table-cell-ellipsis",
      key: "sort",
      align: "center"
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      className: "ant-table-cell-ellipsis",
      key: "createdAt",
      align: "center",
      render: (_: any, item: Spu) => <>{dayjs(Number(item.createdAt)).format("YYYY-MM-DD HH:mm:ss")}</>
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      render: (_: any, spu: Spu) => (
        <Space size="small" direction="vertical">
          {can("mutation.updateSpu") ? (
            <Button
              size="small"
              onClick={() => {
                navigate(`/product/spu/edit?id=${spu.id}`);
              }}
            >
              编辑
            </Button>
          ) : null}
          {can("mutation.createSku") ? (
            <Button
              size="small"
              onClick={() => {
                navigate(`/product/sku/add?spuId=${spu.id}`);
              }}
            >
              新增sku
            </Button>
          ) : null}
          {!spu.publishedAt && can("mutation.publishSpu") ? (
            <Popconfirm
              title="上架"
              description="确认上架"
              onConfirm={async () => {
                const res = await apolloClient.mutate({
                  mutation: gql(/* GraphQL */ `
                    mutation PublishSpu($query: SpuQuery!) {
                      publishSpu(query: $query) {
                        id
                      }
                    }
                  `),
                  variables: {
                    query: {
                      id: spu.id
                    }
                  },
                  errorPolicy: "all"
                });
                if (res.errors) {
                  message.error(res.errors[0].message);
                  return;
                }
                loadSpuData();
              }}
            >
              <Button size="small">上架</Button>
            </Popconfirm>
          ) : null}
          {spu.publishedAt && can("mutation.unpublishSpu") ? (
            <Popconfirm
              title="下架"
              description="确认下架"
              onConfirm={async () => {
                const res = await apolloClient.mutate({
                  mutation: gql(/* GraphQL */ `
                    mutation UnpublishSpu($query: SpuQuery!) {
                      unpublishSpu(query: $query) {
                        id
                      }
                    }
                  `),
                  variables: {
                    query: {
                      id: spu.id
                    }
                  },
                  errorPolicy: "all"
                });
                if (res.errors) {
                  message.error(res.errors[0].message);
                  return;
                }
                loadSpuData();
              }}
            >
              <Button danger size="small">
                下架
              </Button>
            </Popconfirm>
          ) : null}
          {can("mutation.deleteSpu") ? (
            <Popconfirm
              title="删除"
              description="确认删除"
              onConfirm={async () => {
                const deleteSpuRes = await apolloClient.mutate({
                  mutation: gql(/* GraphQL */ `
                    mutation DeleteSpu($query: SpuQuery!) {
                      deleteSpu(query: $query) {
                        id
                      }
                    }
                  `),
                  variables: {
                    query: {
                      id: spu.id
                    }
                  },
                  errorPolicy: "all"
                });
                if (deleteSpuRes.errors) {
                  message.error(deleteSpuRes.errors[0].message);
                  return;
                }
                loadSpuData();
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
        {can("mutation.createSpu") ? (
          <Button
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              navigate(`/product/spu/add`);
            }}
          >
            新建
          </Button>
        ) : null}
      </div>
      <Table
        scroll={{ x: true }}
        key={spuPagination?.edges?.reduce((sum, cur) => (sum += cur), "")}
        expandable={{ expandedRowRender }}
        className="mt-4"
        bordered={true}
        pagination={{
          current: spuQuery.offset! / spuQuery.limit! + 1,
          pageSize: spuQuery.limit!,
          total: spuPagination?.totalCount,
          onChange: page => {
            setSpuQuery({ ...spuQuery, offset: (page - 1) * spuQuery.limit! });
          }
        }}
        rowKey="id"
        dataSource={spuPagination?.edges || []}
        columns={columns}
      />
    </div>
  );
};

export default Index;
