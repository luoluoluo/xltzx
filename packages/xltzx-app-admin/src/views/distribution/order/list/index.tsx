import { Table, message, Radio, Input } from "antd";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Order, OrderPagination, OrderQuery } from "@/generated/graphql";
import dayjs from "dayjs";
import { getFileUrl } from "@/utils";
import { getOrderStateText } from "@/utils/order";
import { useSearchParams } from "react-router-dom";

const Index = () => {
  // const [offset, setOffset] = useState(0);
  // const limit = 10;
  const [searchParams] = useSearchParams();
  const [orderQuery, setOrderQuery] = useState<OrderQuery>({
    offset: 0,
    limit: 5,
    staffId: searchParams.get("staffId") || undefined
  });
  const [orderPagination, setOrderPagination] = useState<OrderPagination>();
  const loadOrderData = async () => {
    console.log("loadOrderData");
    const orderRes = await apolloClient.query<{ distributionOrders: OrderPagination }>({
      query: gql(/* GraphQL */ `
        query DistributionOrders($query: OrderQuery!) {
          distributionOrders(query: $query) {
            edges {
              id
              userId
              staffId
              staff {
                id
                name
              }
              user {
                id
                name
                phone
              }
              staffId
              quantity
              commissionAmount
              shippingName
              shippingPhone
              shippingArea
              shippingAddress
              expressCompany
              expressCode
              state
              paidAt
              shippedAt
              canceledAt
              completedAt
              createdAt
              title
              spec
              quantity
              skuId
            }
            totalCount
          }
        }
      `),
      variables: { query: orderQuery },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (orderRes.errors) {
      message.error(orderRes.errors[0].message);
      return;
    }
    setOrderPagination(orderRes.data.distributionOrders);
  };
  useEffect(() => {
    loadOrderData();
  }, [orderQuery]);

  const columns: any[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      fixed: "left"
    },
    {
      title: "分销员工",
      dataIndex: "staffId",
      key: "staffId",
      align: "left",
      render: (_: any, item: Order) => (
        <div>
          <div className=" whitespace-nowrap">ID: {item.staffId}</div>
          <div>姓名: {item.staff?.name}</div>
        </div>
      )
    },
    {
      title: "用户",
      dataIndex: "user",
      className: "ant-table-cell-ellipsis",
      key: "user",
      align: "left",
      render: (_: any, item: Order) => (
        <div>
          <div>id: {item.userId}</div>
          <div>姓名: {item.user?.name}</div>
          <div>手机号: {item.user?.phone}</div>
        </div>
      )
    },
    {
      title: "订单金额",
      dataIndex: "amount",
      className: "ant-table-cell-ellipsis",
      key: "amount",
      align: "center"
    },
    {
      title: "佣金金额",
      dataIndex: "commissionAmount",
      className: "ant-table-cell-ellipsis",
      key: "commissionAmount",
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "state",
      className: "ant-table-cell-ellipsis",
      key: "state",
      align: "center",
      render: (_: any, item: Order) => getOrderStateText(item.state!)
    },
    {
      title: "商品明细",
      dataIndex: "skus",
      className: "ant-table-cell-ellipsis",
      key: "skus",
      align: "left",
      render: (_: any, item: Order) => (
        <div>
          <div className="flex gap-2 items-center">
            <img src={getFileUrl(item.fileId!)} className="h-8 w-auto" />
            <div>{`${item.title} ${item.spec} x${item.quantity}`}</div>
          </div>
        </div>
      )
    },
    {
      title: "完成时间",
      dataIndex: "paidAt",
      className: "ant-table-cell-ellipsis",
      key: "paidAt",
      align: "center",
      render: (_: any, item: Order) => (
        <>{item.completedAt ? dayjs(Number(item.completedAt)).format("YYYY-MM-DD HH:mm:ss") : "-"}</>
      )
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      className: "ant-table-cell-ellipsis",
      key: "createdAt",
      align: "center",
      render: (_: any, item: Order) => <>{dayjs(Number(item.createdAt)).format("YYYY-MM-DD HH:mm:ss")}</>
    }
  ];
  return (
    <div className="card content-box">
      <div className="flex gap-2 flex-wrap mt-4">
        <Radio.Group
          value={orderQuery.state}
          onChange={e => {
            setOrderQuery({ ...orderQuery, state: e.target.value });
          }}
        >
          <Radio.Button value={undefined}>全部</Radio.Button>
          <Radio.Button value="shipped">待完成</Radio.Button>
          <Radio.Button value="completed">已完成</Radio.Button>
        </Radio.Group>
        <Input
          className="w-40"
          allowClear
          placeholder="员工ID"
          defaultValue={orderQuery.staffId || ""}
          onChange={e => {
            setOrderQuery({ ...orderQuery, staffId: e.currentTarget.value });
          }}
        />
      </div>
      <Table
        scroll={{ x: true }}
        className="mt-4"
        bordered={true}
        pagination={{
          current: orderQuery.offset! / orderQuery.limit! + 1,
          pageSize: orderQuery.limit!,
          total: orderPagination?.totalCount,
          onChange: page => {
            setOrderQuery({ ...orderQuery, offset: (page - 1) * orderQuery.limit! });
          }
        }}
        rowKey="id"
        dataSource={orderPagination?.edges || []}
        columns={columns}
      />
    </div>
  );
};

export default Index;
