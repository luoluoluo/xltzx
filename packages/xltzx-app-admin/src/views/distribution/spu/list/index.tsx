import { Table, message } from "antd";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Sku, Spu, SpuPagination, SpuQuery } from "@/generated/graphql";
import dayjs from "dayjs";
import { getFileUrl } from "@/utils";

const Index = () => {
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
        title: "创建时间",
        dataIndex: "createdAt",
        className: "ant-table-cell-ellipsis",
        key: "createdAt",
        align: "center",
        render: (_: any, item: Sku) => <>{dayjs(Number(item.createdAt)).format("YYYY-MM-DD HH:mm:ss")}</>
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
      title: "创建时间",
      dataIndex: "createdAt",
      className: "ant-table-cell-ellipsis",
      key: "createdAt",
      align: "center",
      render: (_: any, item: Spu) => <>{dayjs(Number(item.createdAt)).format("YYYY-MM-DD HH:mm:ss")}</>
    }
  ];
  return (
    <div className="card content-box">
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
