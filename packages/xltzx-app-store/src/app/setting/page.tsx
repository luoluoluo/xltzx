import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { SettingForm } from "@/components/setting/setting-form";

import { getSetting } from "@/config/setting";
export async function generateMetadata() {
  const setting = await getSetting();
  return {
    title: `设置-${setting?.title}`
  };
}

export default async function Page() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container flex-1">
        <SettingForm />
      </main>
      <SiteFooter />
    </div>
  );
}
