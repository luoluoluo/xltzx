"use client";
import { Setting } from "@/generated/graphql";
import { getFileUrl } from "@/utils";
import Image from "next/image";
import { Clipboard } from "../clipboard";
import { Icons } from "../icons";
import { toast } from "../ui/use-toast";

export const BusinessCard = function ({ setting }: { setting?: Setting }) {
  return (
    <div>
      <div className="flex w-full  shadow rounded overflow-hidden mt-8">
        <div>
          <Image
            width={200}
            height={200}
            alt={setting?.name || ""}
            src={getFileUrl(setting?.logoFileId || "")}
            className="w-40 h-40 object-cover"
          ></Image>
        </div>
        <div className={` relative flex flex-col p-2 ml-2`}>
          <div
            className=" absolute left-0 top-0 w-full h-full pointer-events-none -z-10"
            style={{
              backgroundImage: `url(${getFileUrl(setting?.logoFileId || "")})`,
              backgroundPosition: "center",
              backgroundSize: "100%",
              filter: "blur(220px)"
            }}
          ></div>
          <div className="flex flex-col">
            <div>{setting?.name}</div>
            <div className=" text-gray-500 text-sm mt-0.5">{setting?.title}</div>
          </div>
          <div className="flex flex-col justify-end text-sm mt-4 text-gray-700 gap-0.5">
            {setting?.wechat ? (
              <Clipboard
                value={setting.wechat}
                onSuccess={() => {
                  toast({ title: "微信复制成功" });
                }}
              >
                <div className="flex items-center">
                  <Icons.wechat className="w-3.5 h-3.5" /> <div className="ml-1">{setting.wechat}</div>
                </div>
              </Clipboard>
            ) : null}
            {setting?.phone ? (
              <Clipboard
                value={setting.phone}
                onSuccess={() => {
                  toast({ title: "手机号复制成功" });
                }}
              >
                <div className="flex items-center">
                  <Icons.phone className="w-3.5 h-3.5" /> <div className="ml-1">{setting.phone}</div>
                </div>
              </Clipboard>
            ) : null}
            {setting?.address ? (
              <Clipboard
                value={setting.address}
                onSuccess={() => {
                  toast({ title: "地址复制成功" });
                }}
              >
                <div className="flex items-center">
                  <Icons.location className="w-3.5 h-3.5" /> <div className="ml-1">{setting.address}</div>
                </div>
              </Clipboard>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4 w-full flex-wrap">
        {setting?.keyword?.split("\n").map((v, k) => (
          <div key={k} className="border px-2 rounded whitespace-nowrap">
            {v}
          </div>
        ))}
      </div>
      <div className="flex items-center font-bold mt-8">
        <Icons.activity className="w-4 h-4" /> <div className="ml-1">我的简介</div>
      </div>
      <div className=" whitespace-pre-wrap shadow mt-4 p-4">{setting?.description}</div>
    </div>
  );
};
