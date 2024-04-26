"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/auth";
import { Sku, Spu } from "@/generated/graphql";
import { getFileUrl } from "@/utils";
import { getLoginUrl } from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AmountFormat } from "../amount";
import { AuthLink } from "../layouts/auth-link";
import { BuyNumber } from "./buy-number";
import { CheckoutSheet } from "./checkout-sheet";

export const BuyButton = ({ sku, spu, quantity, className }: { sku: Sku; spu: Spu; quantity: number; className: string }) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext.state.token) {
    return (
      <Button
        size="lg"
        className={className}
        onClick={() => {
          const loginUrl = getLoginUrl();
          if (loginUrl) router.push(loginUrl);
        }}
      >
        <AuthLink>立即购买</AuthLink>
      </Button>
    );
  } else if (!spu.publishedAt) {
    return (
      <Button size="lg" disabled className={className}>
        已下架
      </Button>
    );
  } else if (quantity > (sku.stock || 0)) {
    return (
      <Button size="lg" disabled className={className}>
        库存不足
      </Button>
    );
  } else {
    return (
      <CheckoutSheet sku={sku}>
        <Button size="lg" className={className}>
          立即购买
        </Button>
      </CheckoutSheet>
    );
  }
};

export const BuyCard = ({ spu, sku }: { spu: Spu; sku: Sku }) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="px-4 box-border w-full h-full mt-4 lg:mt-0">
      <div>
        <div className="text-black font-bold text-xl lg:text-3xl">{spu.title}</div>
        <div className=" mt-2 lg:mt-4">
          <AmountFormat value={sku?.price || 0} size="xl" />
        </div>
        <div className="flex flex-col gap-2 mt-4 lg:mt-8">
          <div className="">选择{spu.specNames?.map(v => <span key={v.id}>{v.name}</span>)}</div>
          <div className=" flex flex-wrap gap-4">
            {spu.skus?.map(v => {
              return (
                <div className=" relative" key={v.id}>
                  <Link
                    href={`/product/${spu.id}?skuId=${v.id}`}
                    // scroll={false}
                    className={` cursor-pointer rounded relative border border-solid flex items-center overflow-hidden ${sku.id === v.id ? "border-primary" : ""}`}
                  >
                    <Image
                      priority
                      width={480}
                      height={480}
                      alt=""
                      src={getFileUrl(v.fileId!)}
                      className="w-10 h-10 object-cover object-center"
                    />
                    <div className="flex gap-1 px-4 text-gray-500 text-sm whitespace-nowrap">
                      {v.skuSpecValues?.map(v => {
                        return <span key={v.id}>{v.specValue?.value}</span>;
                      })}
                    </div>
                  </Link>
                  {(v?.stock || 0) <= 0 ? (
                    <div className="flex rounded items-center justify-center w-8 h-4 absolute -top-2 -right-[1px] bg-gray-400 text-white text-xs">
                      无货
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="fixed z-10 bottom-0 left-0 lg:relative w-full p-2 lg:p-0 lg:pt-8 mt-8 border-t flex items-center lg:items-end gap-2 lg:gap-4 bg-white">
        <div>
          <div className="hidden lg:block">数量</div>
          <BuyNumber
            maxValue={sku.stock || 1}
            value={quantity}
            className="lg:mt-2"
            onChange={value => {
              setQuantity(value || 1);
            }}
          />
        </div>
        <BuyButton sku={sku} spu={spu} quantity={quantity} className="w-full lg:max-w-md" />
      </div>
    </div>
  );
};
