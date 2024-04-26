import { useEffect, useState } from "react";
import Form from "./_components/form";
import { Order } from "@/generated/graphql";
import { apolloClient } from "@/utils/request";
import { gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { message } from "antd";
const Index = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState<Order>();
  const loadOrderData = async () => {
    const orderRes = await apolloClient.query<{ order: Order }>({
      query: gql(/* GraphQL */ `
        query Order($query: OrderQuery!) {
          order(query: $query) {
            id
            amount
          }
        }
      `),
      variables: { query: { id } },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (orderRes.errors) {
      message.error(orderRes.errors[0].message);
      return;
    }
    setOrder(orderRes.data.order);
  };
  useEffect(() => {
    loadOrderData();
  }, []);
  if (!order) return <></>;
  return (
    <div className="p-4 bg-white">
      <Form order={order}></Form>
    </div>
  );
};

export default Index;
