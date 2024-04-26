import { AuthDropdown } from "@/components/layouts/auth-dropdown";
import { MainNav } from "@/components/layouts/main-nav";
import { MobileNav } from "@/components/layouts/mobile-nav";
import { headerMenuItems } from "@/config/config";
import { getSetting } from "@/config/setting";
import { getFileUrl } from "@/utils";
import Image from "next/image";
import Link from "next/link";

const Logo = async ({ className }: { className?: string }) => {
  const setting = await getSetting();
  return (
    <Link href="/" className={`flex items-center flex-nowrap space-x-2 ${className}`}>
      <Image
        priority
        alt=""
        src={getFileUrl(setting?.logoFileId || "")}
        height="24"
        width="24"
        className="rounded object-cover w-6 h-6"
      ></Image>
      <span className="whitespace-nowrap text-primary font-bold max-w-[50vw] lg:max-w-xs overflow-hidden text-ellipsis">
        {setting?.name}
      </span>
      <span className="sr-only">Home</span>
    </Link>
  );
};
export async function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 w-full bg-background border-b">
      <div className="container flex h-12 lg:h-16 items-center justify-between w-full box-border">
        <MobileNav items={headerMenuItems} />
        <div className="flex items-center gap-8">
          <Logo className="flex justify-center lg:justify-start" />
          <MainNav items={headerMenuItems} />
        </div>
        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">
            <AuthDropdown className="p-0" />
          </nav>
        </div>
      </div>
    </header>
  );
}
