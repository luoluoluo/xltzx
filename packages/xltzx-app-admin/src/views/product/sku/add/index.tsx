import { useSearchParams } from "react-router-dom";
import Form from "../_components/form";
import { useEffect, useState } from "react";
import { Spu } from "@/generated/graphql";
import { apolloClient } from "@/utils/request";
import { gql } from "@apollo/client";
import { message } from "antd";

const Index = () => {
  const [searchParams] = useSearchParams();
  const spuId = searchParams.get("spuId");
  const [spu, setSpu] = useState<Spu>();
  const loadSpuData = async () => {
    const spuRes = await apolloClient.query<{ spu: Spu }>({
      query: gql(/* GraphQL */ `
        query Spu($query: SpuQuery!) {
          spu(query: $query) {
            id
            title
            content
            fileId
            sort
          }
        }
      `),
      variables: { query: { id: spuId } },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (spuRes.errors) {
      message.error(spuRes.errors[0].message);
      return;
    }
    setSpu(spuRes.data.spu);
  };
  useEffect(() => {
    loadSpuData();
  }, []);
  if (!spu) return <></>;
  return (
    <div className="p-4 bg-white">
      <Form spu={spu}></Form>
    </div>
  );
};

export default Index;
