import { useState } from "react";
import { Button, Form, Input, message, Space } from "antd";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Spu, SpuInput } from "@/generated/graphql";
import { useNavigate } from "react-router-dom";
import { CustomUpload } from "@/components/custom-upload";
import { CustomEditor } from "@/components/custom-editor";
import * as Icons from "@ant-design/icons";

const Index = ({ spu }: { spu?: Spu }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   let key: keyof Spu;
  //   for (key in spu) {
  //     switch (key) {
  //       default:
  //         form.setFieldValue(key, spu && spu[key] ? spu[key] : "");
  //         break;
  //     }
  //   }
  // }, [spu]);

  const onFinish = async (data: SpuInput) => {
    try {
      setLoading(true);
      let spuGql = gql(/* GraphQL */ `
        mutation CreateSpu($input: SpuInput!) {
          createSpu(input: $input) {
            id
          }
        }
      `);

      let spuVariables: any = {
        input: {
          ...data,
          sort: Number(data.sort || 0),
          attrs: data.attrs?.map(v => ({ name: v.name, value: v.value })) || undefined,
          specNames: data.specNames?.map(v => ({
            id: v.id,
            name: v.name,
            specValues: v.specValues?.map(vv => ({ id: vv.id, value: vv.value }))
          }))
        }
      };

      if (spu) {
        spuGql = gql(/* GraphQL */ `
          mutation UpdateSpu($query: SpuQuery!, $input: SpuInput!) {
            updateSpu(query: $query, input: $input) {
              id
            }
          }
        `);
        spuVariables.query = { id: spu.id };
      }

      const spuRes = await apolloClient.mutate<Spu>({
        mutation: spuGql,
        variables: spuVariables,
        errorPolicy: "all"
      });
      setLoading(false);
      if (spuRes.errors) {
        message.error(spuRes.errors[0].message);
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
      name="spu"
      labelCol={{ span: 5 }}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      <Form.Item name="fileId" label="主图" rules={[{ required: true, message: "请上传主图" }]} initialValue={spu?.fileId}>
        <CustomUpload max={1} />
      </Form.Item>
      <Form.Item name="title" label="标题" rules={[{ required: true, message: "请输入标题" }]} initialValue={spu?.title}>
        <Input placeholder="请输入标题" maxLength={80} />
      </Form.Item>
      <Form.Item label="规格" required>
        <Form.List name="specNames" initialValue={spu?.specNames || []}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <Form.Item {...restField} name={[name, "id"]} className=" hidden">
                    <Input />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "name"]} rules={[{ required: true, message: "请输入规格名" }]}>
                    <Input placeholder="规格名" />
                  </Form.Item>
                  <Form.List name={[name, "specValues"]}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                            <Form.Item {...restField} name={[name, "id"]} className=" hidden">
                              <Input />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "value"]}
                              rules={[{ required: true, message: "请输入规格值" }]}
                            >
                              <Input placeholder="规格值" />
                            </Form.Item>
                            <Icons.MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<Icons.PlusOutlined />}>
                            添加规格值
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Icons.MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<Icons.PlusOutlined />}>
                  添加规格
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="属性" required>
        <Form.List name="attrs" initialValue={spu?.attrs || []}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <Form.Item {...restField} name={[name, "id"]} className="hidden">
                    <Input />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "name"]} rules={[{ required: true, message: "请输入属性名" }]}>
                    <Input placeholder="属性名" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "value"]} rules={[{ required: true, message: "请输入属性值" }]}>
                    <Input placeholder="属性值" />
                  </Form.Item>
                  <Icons.MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<Icons.PlusOutlined />}>
                  添加属性
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="content" label="详情" rules={[{ required: true, message: "请输入详情" }]} initialValue={spu?.content}>
        <CustomEditor />
        {/* <Input.TextArea placeholder="请输入详情" maxLength={200} /> */}
      </Form.Item>
      <Form.Item
        name="sort"
        label="排序"
        rules={[{ required: true, message: "请输入排序（顺序）" }]}
        initialValue={spu?.sort || 0}
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
