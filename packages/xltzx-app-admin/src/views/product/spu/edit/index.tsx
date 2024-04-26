import { useEffect, useState } from "react";
import Form from "../_components/form";
import { Spu } from "@/generated/graphql";
import { apolloClient } from "@/utils/request";
import { gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { message } from "antd";
const Index = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
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
            attrs {
              id
              name
              value
            }
            specNames {
              id
              name
              specValues {
                id
                value
              }
            }
            sort
          }
        }
      `),
      variables: { query: { id } },
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
