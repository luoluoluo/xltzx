import Link from "next/link";

import { Shell } from "@/components/shell";
import { footerMenuItems } from "@/config/config";
import { getSetting } from "@/config/setting";
import { getFileUrl } from "@/utils";
import Image from "next/image";

export async function SiteFooter() {
  const setting = await getSetting();
  return (
    <footer className="w-full border-t bg-background mt-8">
      <Shell>
        <div id="footer-links" aria-labelledby="footer-links-heading" className="grid flex-1 grid-cols-1 gap-10 lg:grid-cols-5">
          <Link href="/" className="flex flex-nowrap space-x-2">
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
          {footerMenuItems.map(item => (
            <div key={item.title} className="space-y-3">
              <h4 className="text-base font-medium">{item.title}</h4>
              <ul className="space-y-2.5">
                {item.items.map(link => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      rel={link?.external ? "noreferrer" : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                      <span className="sr-only">{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-3">
            <h4 className="text-base font-medium">微信公众号</h4>
            <Image
              priority
              width={200}
              height={200}
              src={getFileUrl(setting?.mpQrcodeFileId || "")}
              alt="微信公众号"
              className="w-40 h-40 border"
            />
          </div>
          {/* <div className="space-y-3">
              <h4 className="text-base font-medium">抖音号</h4>
              <Image
                width={200}
                height={200}
                src="/images/douyin.webp"
                alt="抖音号"
                className="w-48 h-auto bg-gray-700 rounded-full"
              />
            </div> */}
        </div>
      </Shell>
      <div className="flex flex-col lg:flex-row p-4 box-border w-full justify-center text-gray-400 text-sm gap-2">
        {setting?.copyright?.split("\n").map((v, k) => (
          <div key={k} className="text-center">
            {v}
          </div>
        ))}
      </div>
    </footer>
  );
}
