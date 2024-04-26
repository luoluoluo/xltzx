import { runtime } from ".";

export const staffIdKey = "staffId";
export const tokenKey = "token";

export const meKey = "me";

const loadHeaders = () => {
  return import("next/headers");
};
/* server end */

/* client start */
const loadClientCookies = () => {
  return import("js-cookie");
};
/* client end */

export const getToken = async () => {
  switch (runtime) {
    case "server":
      return (await loadHeaders()).headers().get(tokenKey) || "";
    case "client":
      return (await loadClientCookies()).default.get(tokenKey) || "";
    default:
      return "";
  }
};

export const getLoginUrl = () => {
  if (runtime === "server") return "";
  return `/auth/login?url=${encodeURIComponent(window.location.href)}`;
};
