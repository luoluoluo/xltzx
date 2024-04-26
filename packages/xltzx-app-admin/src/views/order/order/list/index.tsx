import { can } from "@/utils/auth";
import { Table, Button, Space, message, Radio, Input } from "antd";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Order, OrderPagination, OrderQuery, OrderState } from "@/generated/graphql";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { getFileUrl } from "@/utils";
import { getOrderStateText } from "@/utils/order";

const Index = () => {
  const navigate = useNavigate();
  // const [offset, setOffset] = useState(0);
  // const limit = 10;
  const [orderQuery, setOrderQuery] = useState<OrderQuery>({
    offset: 0,
    limit: 5
  });
  const [orderPagination, setOrderPagination] = useState<OrderPagination>();
  const loadOrderData = async () => {
    console.log("loadOrderData");
    const orderRes = await apolloClient.query<{ orders: OrderPagination }>({
      query: gql(/* GraphQL */ `
        query Orders($query: OrderQuery!) {
          orders(query: $query) {
            edges {
              id
              userId
              user {
                id
                name
                phone
              }
              staffId
              quantity
              amount
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
    setOrderPagination(orderRes.data.orders);
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
      title: "订单金额",
      dataIndex: "amount",
      className: "ant-table-cell-ellipsis",
      key: "amount",
      align: "center"
    },
    {
      title: "邮寄地址",
      dataIndex: "shipping",
      className: "ant-table-cell-ellipsis",
      key: "shipping",
      align: "left",
      render: (_: any, item: Order) => (
        <div>
          <div>姓名: {item.shippingName}</div>
          <div>手机号: {item.shippingPhone}</div>
          <div>地址: {`${item.shippingArea}${item.shippingAddress}`}</div>
        </div>
      )
    },
    {
      title: "快递信息",
      dataIndex: "express",
      className: "ant-table-cell-ellipsis",
      key: "express",
      align: "center",
      render: (_: any, item: Order) => {
        return item.shippedAt ? (
          <div className=" text-left">
            <div>快递公司: {item.expressCompany}</div>
            <div>快递编码: {item.expressCode}</div>
          </div>
        ) : (
          <>-</>
        );
      }
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
      title: "支付时间",
      dataIndex: "paidAt",
      className: "ant-table-cell-ellipsis",
      key: "paidAt",
      align: "center",
      render: (_: any, item: Order) => <>{item.paidAt ? dayjs(Number(item.paidAt)).format("YYYY-MM-DD HH:mm:ss") : "-"}</>
    },
    {
      title: "发货时间",
      dataIndex: "shippedAt",
      className: "ant-table-cell-ellipsis",
      key: "shippedAt",
      align: "center",
      render: (_: any, item: Order) => <>{item.shippedAt ? dayjs(Number(item.shippedAt)).format("YYYY-MM-DD HH:mm:ss") : "-"}</>
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
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      render: (_: any, order: Order) => (
        <Space size="small" direction="vertical">
          {order.state === "paid" && can("mutation.shipOrder") ? (
            <Button
              size="small"
              onClick={() => {
                navigate(`/order/order/ship?id=${order.id}`);
              }}
            >
              发货
            </Button>
          ) : null}
          {[OrderState.Paid, OrderState.Shipped].includes(order.state!) && can("mutation.refundOrder") ? (
            <Button
              danger
              size="small"
              onClick={() => {
                navigate(`/order/order/refund?id=${order.id}`);
              }}
            >
              退款
            </Button>
          ) : null}
        </Space>
      )
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
          <Radio.Button value="created">待支付</Radio.Button>
          <Radio.Button value="paid">待发货</Radio.Button>
          <Radio.Button value="shipped">已发货</Radio.Button>
          <Radio.Button value="completed">已完成</Radio.Button>
          <Radio.Button value="canceled">已取消</Radio.Button>
          <Radio.Button value="refunded">已退款</Radio.Button>
        </Radio.Group>
        <Input
          className="w-40"
          allowClear
          placeholder="订单ID"
          defaultValue={orderQuery.id || ""}
          onChange={e => {
            setOrderQuery({ ...orderQuery, id: e.currentTarget.value });
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
