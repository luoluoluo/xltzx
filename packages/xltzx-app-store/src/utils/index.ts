import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const runtime = typeof window === "undefined" ? "server" : "client";

export const getFileUrl = (fileId: string, options?: { w?: number; h?: number }) => {
  let url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/file?id=${fileId}`;
  if (options?.w) {
    url += `&w=${options.w}`;
  }
  if (options?.h) {
    url += `&h=${options.h}`;
  }
  return url;
};

export const getChannel = (userAgent: string) => {
  // const userAgent = window.navigator.userAgent;
  if (/MicroMessenger/i.test(userAgent)) return "wechat";
  return "";
};

// export const channel = getChannel();
