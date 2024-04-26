import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";

import { RegisterForm } from "@/components/auth/register-form";
import { getSetting } from "@/config/setting";

export async function generateMetadata() {
  const setting = await getSetting();
  return {
    title: `注册 - ${setting?.name} - ${setting?.title}`
  };
}
export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container">
        <RegisterForm />
      </main>
      <SiteFooter />
    </div>
  );
}
