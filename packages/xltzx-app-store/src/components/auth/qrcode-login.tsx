"use client";

import { LoginKey, Token } from "@/generated/graphql";
import { staffIdKey, tokenKey } from "@/utils/auth";
import { getLogger } from "@/utils/logger";
import { graphqlRequest } from "@/utils/request";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

const loginWithKey = async (loginKey: LoginKey) => {
  const res = await graphqlRequest<{ loginWithKey: Token }>({
    document: /* GraphQL */ `
      mutation LoginWithKey($input: LoginInput!) {
        loginWithKey(input: $input) {
          token
          id
        }
      }
    `,
    variables: { input: { type: loginKey.type, loginKey: loginKey.loginKey } }
  });
  if (res.errors) {
    getLogger().error(res.errors);
    return undefined;
  }
  return res.data?.loginWithKey;
};

export const QrcodeLogin = ({ loginKey }: { loginKey: LoginKey }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    let u = new URL(window.location.href);
    const redirectUrl = u.searchParams.get("url");
    if (redirectUrl) {
      u = new URL(redirectUrl);
    } else {
      u = new URL(window.location.origin);
    }
    u.searchParams.set("login", "force");
    u.searchParams.set("loginKey", loginKey.loginKey);
    u.searchParams.set("type", loginKey.type);
    const staffid = Cookies.get(staffIdKey);
    if (staffid) {
      u.searchParams.set(staffIdKey, staffid);
    }
    u.toString();
    setValue(u.toString());
    const t = setInterval(async () => {
      const token = await loginWithKey(loginKey);
      if (token?.token) {
        clearInterval(t);
        Cookies.set(tokenKey, token.token, { expires: dayjs().add(7, "days").toDate() });
        window.location.href = redirectUrl || "/";
      }
    }, 1000);
    return () => {
      clearInterval(t);
    };
  }, [loginKey]);
  console.log(value);
  return (
    <div className="w-full py-20 flex flex-col justify-center items-center">
      <div className="text-center text-2xl font-bold">登录</div>
      <QRCodeCanvas value={value} size={256} className="mt-8" />
      <div className=" text-gray-500 mt-4">请使用微信扫码登录</div>
    </div>
  );
};
