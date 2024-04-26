import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Setting, SettingInput } from "@/generated/graphql";
import { CustomUpload } from "@/components/custom-upload";
import { CustomEditor } from "@/components/custom-editor";

const Index = ({ setting }: { setting?: Setting }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (data: SettingInput) => {
    try {
      setLoading(true);
      const settingRes = await apolloClient.mutate<Setting>({
        mutation: gql(/* GraphQL */ `
          mutation MutationSetting($input: SettingInput!) {
            mutationSetting(input: $input) {
              id
            }
          }
        `),
        variables: {
          input: {
            ...data
          }
        },
        errorPolicy: "all"
      });
      setLoading(false);
      if (settingRes.errors) {
        message.error(settingRes.errors[0].message);
        return;
      }
      message.success("提交成功");
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
      name="setting"
      labelCol={{ span: 5 }}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      <Form.Item name="logoFileId" label="照片/头像" initialValue={setting?.logoFileId}>
        <CustomUpload />
      </Form.Item>
      <Form.Item name="name" label="姓名" initialValue={setting?.name}>
        <Input placeholder="请输入姓名" maxLength={80} />
      </Form.Item>
      <Form.Item name="title" label="职业/口号" initialValue={setting?.title}>
        <Input placeholder="请输入职业/口号" maxLength={80} />
      </Form.Item>
      <Form.Item name="keyword" label="标签/技能" initialValue={setting?.keyword}>
        <Input.TextArea placeholder="请输入标签/技能（每行一个）" maxLength={200} showCount />
      </Form.Item>
      <Form.Item name="description" label="简介" initialValue={setting?.description}>
        <Input.TextArea placeholder="请输入简介" maxLength={400} showCount />
      </Form.Item>
      <Form.Item name="address" label="地址" initialValue={setting?.address}>
        <Input placeholder="请输入地址" maxLength={200} />
      </Form.Item>
      <Form.Item name="phone" label="手机号" initialValue={setting?.phone}>
        <Input placeholder="请输入手机号" maxLength={80} />
      </Form.Item>
      <Form.Item name="wechat" label="微信号" initialValue={setting?.wechat}>
        <Input placeholder="请输入微信号" maxLength={80} />
      </Form.Item>
      <Form.Item name="copyright" label="版权信息" initialValue={setting?.copyright}>
        <Input.TextArea placeholder="请输入版权信息" maxLength={200} />
      </Form.Item>
      <Form.Item name="mpQrcodeFileId" label="微信公众号二维码" initialValue={setting?.mpQrcodeFileId}>
        <CustomUpload />
      </Form.Item>
      <Form.Item name="guide" label="购物说明" initialValue={setting?.guide}>
        <CustomEditor />
      </Form.Item>
      <Form.Item name="privacyAgreement" label="隐私协议" initialValue={setting?.privacyAgreement}>
        <CustomEditor />
      </Form.Item>
      <Form.Item name="termsOfService" label="服务条款" initialValue={setting?.termsOfService}>
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
