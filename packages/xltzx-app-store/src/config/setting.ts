import { Setting } from "@/generated/graphql";
import { getLogger } from "@/utils/logger";
import { graphqlRequest } from "@/utils/request";

export const getSetting = async () => {
  const res = await graphqlRequest<{ setting: Setting }>({
    document: /* GraphQL */ `
      query Setting {
        setting {
          id
          name
          title
          keyword
          description
          copyright
          address
          phone
          wechat
          logoFileId
          mpQrcodeFileId
          privacyAgreement
          termsOfService
          guide
        }
      }
    `
  });
  if (res.errors) {
    getLogger().error(res);
    return undefined;
  }
  return res.data?.setting;
};
