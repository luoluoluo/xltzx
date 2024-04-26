import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Banner, BannerInput } from "@/generated/graphql";
import { useNavigate } from "react-router-dom";
import { CustomUpload } from "@/components/custom-upload";

const Index = ({ banner }: { banner?: Banner }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (data: BannerInput) => {
    try {
      setLoading(true);
      let bannerGql = gql(/* GraphQL */ `
        mutation CreateBanner($input: BannerInput!) {
          createBanner(input: $input) {
            id
          }
        }
      `);

      let bannerVariables: any = {
        input: {
          ...data,
          sort: Number(data.sort || 0)
        }
      };

      if (banner) {
        bannerGql = gql(/* GraphQL */ `
          mutation UpdateBanner($query: BannerQuery!, $input: BannerInput!) {
            updateBanner(query: $query, input: $input) {
              id
            }
          }
        `);
        bannerVariables.query = { id: banner.id };
      }

      const bannerRes = await apolloClient.mutate<Banner>({
        mutation: bannerGql,
        variables: bannerVariables,
        errorPolicy: "all"
      });
      setLoading(false);
      if (bannerRes.errors) {
        message.error(bannerRes.errors[0].message);
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
      name="banner"
      labelCol={{ span: 5 }}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      <Form.Item name="fileId" label="图片" rules={[{ required: true, message: "请上传图片" }]} initialValue={banner?.fileId}>
        <CustomUpload max={1} />
      </Form.Item>
      <Form.Item name="title" label="标题" rules={[{ required: true, message: "请输入标题" }]} initialValue={banner?.title}>
        <Input placeholder="请输入标题" maxLength={80} />
      </Form.Item>
      <Form.Item name="link" label="链接" rules={[{ required: true, message: "请输入链接" }]} initialValue={banner?.link}>
        <Input placeholder="请输入链接" maxLength={80} />
      </Form.Item>
      <Form.Item
        name="sort"
        label="排序"
        rules={[{ required: true, message: "请输入排序（顺序）" }]}
        initialValue={banner?.sort || 0}
      >
        <Input type="number" placeholder="请输入分类名" maxLength={80} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Index;
