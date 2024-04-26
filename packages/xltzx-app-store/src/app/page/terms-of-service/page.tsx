import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { getSetting } from "@/config/setting";

export async function generateMetadata() {
  const setting = await getSetting();
  return {
    title: `服务条款 - ${setting?.name} - ${setting?.title}`
  };
}

export default async function Page() {
  const setting = await getSetting();
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container">
          <div className="mt-8 p-4 text-center font-bold text-xl">服务条款</div>
          <div className="mt-8 ProseMirror" dangerouslySetInnerHTML={{ __html: setting?.termsOfService || "" }}></div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
