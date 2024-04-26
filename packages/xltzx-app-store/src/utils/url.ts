// import { headers } from "next/headers";
import { runtime } from ".";

const loadHeaders = () => {
  return import("next/headers");
};

export const getUrl = async () => {
  switch (runtime) {
    case "server":
      const headersList = (await loadHeaders()).headers();
      return headersList.get("x-url") || "";
    case "client":
      return window.location.href;
    default:
      return "";
  }
};
