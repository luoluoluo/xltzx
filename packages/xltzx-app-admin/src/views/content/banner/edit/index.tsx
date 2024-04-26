import { useEffect, useState } from "react";
import Form from "../_components/form";
import { Banner } from "@/generated/graphql";
import { apolloClient } from "@/utils/request";
import { gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { message } from "antd";
const Index = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [banner, setBanner] = useState<Banner>();
  const loadBannerData = async () => {
    const bannerRes = await apolloClient.query<{ banner: Banner }>({
      query: gql(/* GraphQL */ `
        query Banner($query: BannerQuery!) {
          banner(query: $query) {
            id
            title
            link
            sort
            fileId
          }
        }
      `),
      variables: { query: { id } },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (bannerRes.errors) {
      message.error(bannerRes.errors[0].message);
      return;
    }
    setBanner(bannerRes.data.banner);
  };
  useEffect(() => {
    loadBannerData();
  }, []);
  if (!banner) return <></>;
  return (
    <div className="p-4 bg-white">
      <Form banner={banner}></Form>
    </div>
  );
};

export default Index;
