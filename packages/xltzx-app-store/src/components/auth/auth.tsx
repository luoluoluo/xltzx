import { ignoreLoginPaths } from "@/config/auth";
import { AuthContextProvider } from "@/contexts/auth";
import { User } from "@/generated/graphql";
import { meKey, tokenKey } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Auth({ children }: { children: React.ReactNode }) {
  const token = headers().get(tokenKey) || undefined;
  const meStr = headers().get(meKey);
  const me = meStr ? (JSON.parse(decodeURIComponent(meStr)) as User) : undefined;
  const url = new URL(headers().get("x-url") || "");
  const ignorePath = ignoreLoginPaths.find(path => (typeof path === "string" ? path === url.pathname : path.test(url.pathname)));
  if (!ignorePath && !me) return redirect("/");
  return (
    <AuthContextProvider initialState={{ me, token }}>
      <>{children}</>
    </AuthContextProvider>
  );
}
