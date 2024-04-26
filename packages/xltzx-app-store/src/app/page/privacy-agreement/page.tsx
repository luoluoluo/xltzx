import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { getSetting } from "@/config/setting";

export async function generateMetadata() {
  const setting = await getSetting();
  return {
    title: `隐私协议 - ${setting?.name} - ${setting?.title}`
  };
}

export default async function Page() {
  const setting = await getSetting();
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container">
          <div className="mt-8 p-4 text-center font-bold text-xl">隐私协议</div>
          <div className="mt-8 ProseMirror" dangerouslySetInnerHTML={{ __html: setting?.privacyAgreement || "" }}></div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
