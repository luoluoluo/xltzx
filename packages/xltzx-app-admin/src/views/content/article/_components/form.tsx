import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Article, ArticleInput } from "@/generated/graphql";
import { useNavigate } from "react-router-dom";
import { CustomEditor } from "@/components/custom-editor";
import { CustomUpload } from "@/components/custom-upload";

const Index = ({ article }: { article?: Article }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (data: ArticleInput) => {
    try {
      setLoading(true);
      let articleGql = gql(/* GraphQL */ `
        mutation CreateArticle($input: ArticleInput!) {
          createArticle(input: $input) {
            id
          }
        }
      `);

      let articleVariables: any = {
        input: {
          ...data
        }
      };

      if (article) {
        articleGql = gql(/* GraphQL */ `
          mutation UpdateArticle($query: ArticleQuery!, $input: ArticleInput!) {
            updateArticle(query: $query, input: $input) {
              id
            }
          }
        `);
        articleVariables.query = { id: article.id };
      }

      const articleRes = await apolloClient.mutate<Article>({
        mutation: articleGql,
        variables: articleVariables,
        errorPolicy: "all"
      });
      setLoading(false);
      if (articleRes.errors) {
        message.error(articleRes.errors[0].message);
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
      name="article"
      labelCol={{ span: 5 }}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      <Form.Item
        name="fileId"
        label="封面图"
        rules={[{ required: true, message: "请上传封面图" }]}
        initialValue={article?.fileId}
      >
        <CustomUpload max={1} />
      </Form.Item>
      <Form.Item name="title" label="标题" rules={[{ required: true, message: "请输入标题" }]} initialValue={article?.title}>
        <Input placeholder="请输入标题" maxLength={80} />
      </Form.Item>
      <Form.Item name="content" label="内容" rules={[{ required: true, message: "请输入内容" }]} initialValue={article?.content}>
        <CustomEditor />
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
