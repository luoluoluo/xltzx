import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";

import { QrcodeLogin } from "@/components/auth/qrcode-login";

import { getSetting } from "@/config/setting";
import { LoginKey, UserType } from "@/generated/graphql";
import { getLogger } from "@/utils/logger";
import { graphqlRequest } from "@/utils/request";
export async function generateMetadata() {
  const setting = await getSetting();
  return {
    title: `登录 - ${setting?.name} - ${setting?.title}`
  };
}
const loadLoginKeyData = async () => {
  const res = await graphqlRequest<{ loginKey: LoginKey }>({
    document: /* GraphQL */ `
      query LoginKey($query: LoginKeyQuery!) {
        loginKey(query: $query) {
          loginKey
          type
        }
      }
    `,
    variables: { query: { type: UserType.Wechat } }
  });
  if (res.errors) {
    getLogger().error(res.errors);
    return undefined;
  }
  return res.data?.loginKey;
};
export default async function Page() {
  const loginKey = await loadLoginKeyData();
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container flex-1">{loginKey ? <QrcodeLogin loginKey={loginKey} /> : null}</main>
      <SiteFooter />
    </div>
  );
}
