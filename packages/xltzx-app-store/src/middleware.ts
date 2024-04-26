import dayjs from "dayjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { LoginInput, Token, User, UserInput, UserType } from "./generated/graphql";
import { getChannel } from "./utils";
import { meKey, staffIdKey, tokenKey } from "./utils/auth";
import { getLogger } from "./utils/logger";
import { graphqlRequest } from "./utils/request";

const loadMeData = async (token: string) => {
  return graphqlRequest<{ me: User }>(
    {
      document: /* GraphQL */ `
        query Me {
          me {
            id
            staffId
            name
            phone
            area
            address
          }
        }
      `
    },
    {
      token
    }
  ).then(res => {
    if (res.errors) {
      getLogger().error(res);
      return undefined;
    }
    return res.data?.me;
  });
};

const login = async ({ code, loginKey }: LoginInput) => {
  return graphqlRequest<{ login: Token }>({
    document: /* GraphQL */ `
      mutation login($input: LoginInput!) {
        login(input: $input) {
          id
          token
        }
      }
    `,
    variables: {
      input: {
        type: UserType.Wechat,
        code,
        loginKey
      }
    }
  }).then(res => {
    if (res.errors) {
      getLogger().error(res);
      return undefined;
    }
    return res.data?.login;
  });
};

const bindStaff = async ({ staffId }: UserInput, token: string) => {
  return graphqlRequest<{ bindStaff: User }>(
    {
      document: /* GraphQL */ `
        mutation BindStaff($input: UserInput!) {
          bindStaff(input: $input) {
            id
          }
        }
      `,
      variables: {
        input: {
          staffId
        }
      }
    },
    { token }
  ).then(res => {
    if (res.errors) {
      getLogger().error(res);
      return undefined;
    }
    return res.data?.bindStaff;
  });
};

export async function middleware(request: Request) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  let url: string | URL = new URL(request.url);
  const host = request.headers.get("host");
  const searchParams = url.searchParams;
  url = url.toString().replace(url.origin, `${host?.includes("localhost") ? "http" : "https"}://${host}`);
  requestHeaders.set("x-url", url);
  let staffId = searchParams.get(staffIdKey) || cookies().get(staffIdKey)?.value;
  const loginControl = searchParams.get("login");

  let token = searchParams.get(tokenKey) || cookies().get(tokenKey)?.value;
  if (loginControl === "force") token = ""; // 强制重新登录
  let me: User | undefined;

  if (token) {
    me = await loadMeData(token);
    if (!me) {
      // token 无效
      token = "";
    }
  }
  const userAgent = requestHeaders.get("User-Agent");
  const channel = getChannel(userAgent!);
  /* 微信登录  start */
  if (!token && channel === "wechat") {
    switch (channel) {
      case "wechat":
        // 微信授权回调
        const state = searchParams.get("state");
        const code = searchParams.get("code");
        const loginKey = searchParams.get("loginKey");
        if (code && state && state === "wechat") {
          await login({ code, loginKey })
            .then(res => {
              token = res?.token;
              if (!token) throw new Error(JSON.stringify(res));
              return loadMeData(token);
            })
            .then(res => {
              me = res;
              if (me?.staffId) staffId = me.staffId;
            })
            .catch(e => {
              getLogger().error(e);
            });
        } else {
          // wechat oauth
          return NextResponse.redirect(
            `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxac999241e944074d&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_base&state=wechat#wechat_redirect`
          );
        }
        break;
    }
  }
  /* 微信登录  end */

  if (token && me) {
    requestHeaders.set(meKey, encodeURIComponent(JSON.stringify(me)));
    requestHeaders.set(tokenKey, token);
  } else {
    requestHeaders.delete(meKey);
    requestHeaders.delete(tokenKey);
  }
  if (staffId) {
    requestHeaders.set(staffIdKey, staffId);
    if (token && me) {
      await bindStaff({ staffId }, token);
    }
  }
  const response = NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders
    }
  });
  if (token && me) {
    response.cookies.set(tokenKey, token, { expires: dayjs().add(7, "days").toDate() });
    response.cookies.set(meKey, encodeURIComponent(JSON.stringify(me)), { expires: dayjs().add(7, "days").toDate() });
  } else {
    response.cookies.delete(tokenKey);
    response.cookies.delete(meKey);
  }
  if (staffId) {
    response.cookies.set(staffIdKey, staffId, { expires: dayjs().add(7, "days").toDate() });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
};
