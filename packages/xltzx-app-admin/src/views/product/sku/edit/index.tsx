import { useEffect, useState } from "react";
import Form from "../_components/form";
import { Sku } from "@/generated/graphql";
import { apolloClient } from "@/utils/request";
import { gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { message } from "antd";
const Index = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [sku, setSku] = useState<Sku>();
  const loadSkuData = async () => {
    const skuRes = await apolloClient.query<{ sku: Sku }>({
      query: gql(/* GraphQL */ `
        query Sku($query: SkuQuery!) {
          sku(query: $query) {
            id
            type
            spuId
            stock
            price
            commissionPrice
            skuFiles {
              fileId
            }
            skuSpecValues {
              id
              specValueId
              specValue {
                specNameId
              }
            }
            spu {
              id
              title
            }
          }
        }
      `),
      variables: { query: { id } },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (skuRes.errors) {
      message.error(skuRes.errors[0].message);
      return;
    }
    setSku(skuRes.data.sku);
  };
  useEffect(() => {
    loadSkuData();
  }, []);
  if (!sku) return <></>;
  return (
    <div className="p-4 bg-white">
      <Form sku={sku}></Form>
    </div>
  );
};

export default Index;
