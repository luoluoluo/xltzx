import Auth from "@/components/auth/auth";
import { Toaster } from "@/components/ui/toaster";
import { getSetting } from "@/config/setting";
import { cn, getFileUrl } from "@/utils";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const setting = await getSetting();
  // console.log(setting);
  return {
    title: `${setting?.name} - ${setting?.title}`,
    keywords: setting?.keyword?.replaceAll("\n", ","),
    description: setting?.description
  };
}

export function generateViewport() {
  return {
    maximumScale: 1.0,
    userScalable: "no"
  };
}
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const setting = await getSetting();
  return (
    <html lang="en">
      <head>
        <link sizes="32x32" rel="icon" type="image/x-icon" href={getFileUrl(setting?.logoFileId || "")} />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta> */}
      </head>
      <body className={cn(inter.className)}>
        <Auth>{children}</Auth>
        <Toaster />
      </body>
    </html>
  );
}
