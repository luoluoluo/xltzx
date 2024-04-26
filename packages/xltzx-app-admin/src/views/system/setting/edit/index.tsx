import { useEffect, useState } from "react";
import Form from "../_components/form";
import { Setting } from "@/generated/graphql";
import { apolloClient } from "@/utils/request";
import { gql } from "@apollo/client";
import { message } from "antd";
const Index = () => {
  const [setting, setSetting] = useState<Setting>();
  const [loaded, setLoaded] = useState(false);
  const loadSettingData = async () => {
    const settingRes = await apolloClient.query<{ setting: Setting }>({
      query: gql(/* GraphQL */ `
        query Setting {
          setting {
            id
            name
            title
            keyword
            description
            phone
            wechat
            address
            copyright
            logoFileId
            mpQrcodeFileId
          }
        }
      `),
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    setLoaded(true);
    if (settingRes.errors) {
      message.error(settingRes.errors[0].message);
      return;
    }
    setSetting(settingRes.data.setting);
  };
  useEffect(() => {
    loadSettingData();
  }, []);
  if (!loaded) return <></>;
  return (
    <div className="p-4 bg-white">
      <Form setting={setting}></Form>
    </div>
  );
};

export default Index;
