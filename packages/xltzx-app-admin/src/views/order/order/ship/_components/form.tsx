import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Order, OrderInput, SkuType } from "@/generated/graphql";
import { useNavigate } from "react-router-dom";

const Index = ({ order }: { order: Order }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (data: OrderInput) => {
    try {
      setLoading(true);
      const orderVariables: any = {
        input: {
          ...data
        },
        query: {
          id: order.id
        }
      };
      const orderGql = gql(/* GraphQL */ `
        mutation ShipOrder($query: OrderQuery!, $input: OrderInput!) {
          shipOrder(query: $query, input: $input) {
            id
          }
        }
      `);

      const orderRes = await apolloClient.mutate<Order>({
        mutation: orderGql,
        variables: orderVariables,
        errorPolicy: "all"
      });
      setLoading(false);
      if (orderRes.errors) {
        message.error(orderRes.errors[0].message);
        return;
      }
      form.resetFields();
      navigate(-1);
    } catch (e: any) {
      message.error(e.message);
      setLoading(false);
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo.errorFields[0].errors[0]);
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="order"
      labelCol={{ span: 5 }}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      {order.type === SkuType.Physical ? (
        <>
          <Form.Item
            name="expressCompany"
            label="快递公司"
            rules={[{ required: true, message: "请输入快递公司" }]}
            initialValue={order?.expressCompany}
          >
            <Input placeholder="请输入快递公司" maxLength={80} />
          </Form.Item>
          <Form.Item
            name="expressCode"
            label="快递单号"
            rules={[{ required: true, message: "请输入快递单号" }]}
            initialValue={order?.expressCode}
          >
            <Input placeholder="请输入快递单号" maxLength={80} />
          </Form.Item>
        </>
      ) : null}
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Index;
