import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { getSetting } from "@/config/setting";

export async function generateMetadata() {
  const setting = await getSetting();
  return {
    title: `购物说明 - ${setting?.name} - ${setting?.title}`
  };
}

export default async function Page() {
  const setting = await getSetting();
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container">
          <div className="mt-8 p-4 text-center font-bold text-xl">购物说明</div>
          <div className="mt-8 wysiwyg" dangerouslySetInnerHTML={{ __html: setting?.guide || "" }}></div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
