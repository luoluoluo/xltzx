"use client";
import { JsConfig } from "@/generated/graphql";
import { staffIdKey } from "@/utils/auth";
import { graphqlRequest } from "@/utils/request";
import Cookies from "js-cookie";
import { useEffect } from "react";
import wx from "weixin-js-sdk";

export const Wechat = (props: { shareConfig?: { title: string; desc?: string; imgUrl?: string } }) => {
  useEffect(() => {
    graphqlRequest<{ jsConfig: JsConfig }>({
      document: /* GraphQL */ `
        query JsConfig($url: String!) {
          jsConfig(url: $url) {
            appId
            timestamp
            nonceStr
            signature
          }
        }
      `,
      variables: { url: window.location.href }
    }).then(res => {
      if (res.errors) {
        console.log(res.errors);
        return;
      }
      if (!res.data) return;
      wx.config({
        ...res.data!.jsConfig,
        // debug: true,
        jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
      });
    });
  }, []);
  useEffect(() => {
    const url = window.location.href;
    const u = new URL(url);
    const staffId = Cookies.get(staffIdKey);
    if (staffId) {
      u.searchParams.set(staffIdKey, staffId);
    }
    const link = u.toString();
    wx.ready(() => {
      // wx.hideMenuItems({
      //   menuList: ["menuItem:copyUrl"]
      // });
      wx.updateAppMessageShareData({
        title: props.shareConfig?.title || "",
        desc: props.shareConfig?.desc || "",
        link,
        imgUrl: props.shareConfig?.imgUrl || "",
        success: () => {
          console.log("updateAppMessageShareData success");
        },
        fail: e => {
          console.log("updateAppMessageShareData error: ", e);
        }
      });
      wx.updateTimelineShareData({
        title: props.shareConfig?.title || "",
        link,
        imgUrl: props.shareConfig?.imgUrl || "",
        success: () => {
          console.log("updateTimelineShareData success");
        },
        fail: e => {
          console.log("updateTimelineShareData error: ", e);
        }
      });
    });
  }, [props.shareConfig]);
  return <></>;
};
