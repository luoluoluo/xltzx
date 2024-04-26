import md5 from "js-md5";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
// import { get, post } from "@/utils/request";
// import { LoginRequest, TokenResponse, StaffResponse } from "swss-api/src/types/user";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { HOME_URL } from "@/config/config";
import { loadMe, setToken } from "@/utils/auth";
import { Staff } from "@/generated/graphql";
import { Token } from "@/generated/graphql";

const Index = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  // 登录
  const onFinish = async (data: Staff) => {
    try {
      setLoading(true);
      data.password = md5(data.password);

      const loginRes = await apolloClient.mutate<{ login: Token }>({
        mutation: gql(/* GraphQL */ `
          mutation Mutation($code: String!, $password: String!) {
            login(code: $code, password: $password) {
              token
              id
            }
          }
        `),
        variables: { code: data.code, password: data.password! },
        errorPolicy: "all"
      });
      setLoading(false);
      if (loginRes.errors) {
        message.error(loginRes.errors[0].message);
        return;
      }

      setToken(loginRes.data?.login?.token || "");
      await loadMe();
      navigate(HOME_URL);
      message.success("登录成功！");
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      message.error(e.message || "网络异常，请重试");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      <Form.Item name="code" rules={[{ required: true, message: "请输入账号" }]}>
        <Input placeholder="请输入账号" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
        <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button
          onClick={() => {
            form.resetFields();
          }}
          icon={<CloseCircleOutlined />}
        >
          重置
        </Button>
        <Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Index;
