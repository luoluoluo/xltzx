import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Sku, SkuInput, SkuType, SpecName, SpecNamePagination, Spu } from "@/generated/graphql";
import { useNavigate } from "react-router-dom";
import { CustomUpload } from "@/components/custom-upload";

const Index = ({ sku, spu }: { sku?: Sku; spu?: Spu }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const [specNames, setSpecNames] = useState<SpecName[]>();
  const loadSpecNameData = async () => {
    console.log("loadSpecNameData");
    const specNameRes = await apolloClient.query<{
      specNames: SpecNamePagination;
    }>({
      query: gql(/* GraphQL */ `
        query SpecNames($query: SpecNameQuery!) {
          specNames(query: $query) {
            edges {
              id
              name
              specValues {
                id
                value
                createdAt
              }
              createdAt
            }
            totalCount
          }
        }
      `),
      variables: { query: { spuId: sku?.spuId || spu?.id } },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (specNameRes.errors) {
      message.error(specNameRes.errors[0].message);
      return;
    }
    setSpecNames(specNameRes.data.specNames?.edges || []);
  };
  useEffect(() => {
    loadSpecNameData();
  }, []);

  const onFinish = async (data: SkuInput) => {
    if (Number(data.commissionPrice) > Number(data.price) * 0.3) {
      message.error("佣金比例需低于30%");
      return;
    }
    try {
      setLoading(true);
      let skuGql = gql(/* GraphQL */ `
        mutation CreateSku($input: SkuInput!) {
          createSku(input: $input) {
            id
          }
        }
      `);

      let skuVariables: any = {
        input: {
          ...data,
          stock: data.stock ? Number(data.stock) : undefined,
          price: data.price ? Number(data.price) : undefined,
          commissionPrice: data.commissionPrice ? Number(data.commissionPrice) : undefined,
          fileId: data.skuFiles ? data.skuFiles[0].fileId : ""
          // skuFiles: data.skuFiles?.map(v => ({ fileId: v }))
        }
      };

      if (sku) {
        skuGql = gql(/* GraphQL */ `
          mutation UpdateSku($query: SkuQuery!, $input: SkuInput!) {
            updateSku(query: $query, input: $input) {
              id
            }
          }
        `);
        skuVariables.query = { id: sku.id };
      }

      const skuRes = await apolloClient.mutate<Sku>({
        mutation: skuGql,
        variables: skuVariables,
        errorPolicy: "all"
      });
      setLoading(false);
      if (skuRes.errors) {
        message.error(skuRes.errors[0].message);
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
      name="sku"
      labelCol={{ span: 5 }}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      <Form.Item name="spuId" initialValue={spu?.id} className=" hidden">
        <Input maxLength={80} />
      </Form.Item>
      {/* <Card title="规格" className="m-4"> */}
      {specNames?.map((specName, index) => {
        return (
          <React.Fragment key={specName.id}>
            <Form.Item
              name={["skuSpecValues", index, "specValueId"]}
              label={specName.name}
              initialValue={sku?.skuSpecValues?.find(v => v.specValue?.specNameId === specName?.id)?.specValueId}
              rules={[{ required: true, message: `请选择图片${specName.name}` }]}
            >
              <Select
                options={specName.specValues?.map(v => ({
                  label: v.value,
                  value: v.id
                }))}
              />
            </Form.Item>
          </React.Fragment>
        );
      })}
      <Form.Item name="type" label="类型" rules={[{ required: true, message: "请输入类型" }]} initialValue={sku?.type}>
        <Select
          options={[
            {
              label: "实物商品",
              value: SkuType.Physical
            },
            {
              label: "虚拟商品",
              value: SkuType.Virtual
            }
          ]}
          placeholder="请选择类型"
          maxLength={80}
        />
      </Form.Item>
      <Form.Item
        name="title"
        label="标题"
        rules={[{ required: true, message: "请输入标题" }]}
        initialValue={sku?.title || sku?.spu?.title || spu?.title}
      >
        <Input placeholder="请输入标题" maxLength={80} />
      </Form.Item>
      {/* </Card> */}
      <Form.Item
        name="skuFiles"
        label="相册"
        rules={[{ required: true, message: "请上传相册" }]}
        initialValue={sku?.skuFiles?.map(v => ({ fileId: v.fileId }))}
      >
        <CustomUpload max={5} />
      </Form.Item>
      <Form.Item name="price" label="销售价" initialValue={sku?.price} rules={[{ required: true, message: `请输入销售价` }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="commissionPrice"
        label="佣金"
        initialValue={sku?.commissionPrice}
        rules={[{ required: true, message: `请输入佣金` }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item name="stock" label="库存数量" initialValue={sku?.stock} rules={[{ required: true, message: `请输入库存` }]}>
        <Input type="number" />
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
