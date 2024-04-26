"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthContext } from "@/contexts/auth";
import { Order, Sku, SkuType, User } from "@/generated/graphql";
import { getFileUrl } from "@/utils";
import { tokenKey } from "@/utils/auth";
import { graphqlRequest } from "@/utils/request";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Image from "next/image";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { AmountFormat } from "../amount";
import { AreaSelect } from "../area-select";
import { toast } from "../ui/use-toast";
import { BuyNumber } from "./buy-number";

export function CheckoutSheet({ sku, children }: { sku: Sku; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  useEffect(() => {
    setLoaded(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<Order>({
    resolver: zodResolver(
      z.object({
        shippingName: z.string().min(1, { message: "请输入姓名" }),
        shippingPhone: z.string().length(11, { message: "请输入11位手机号" }),
        shippingArea: sku.type === SkuType.Physical ? z.string().min(1, { message: "请选择地区" }) : z.any(),
        shippingAddress: sku.type === SkuType.Physical ? z.string().min(1, { message: "请输入详细地址" }) : z.any()
      })
    )
  });
  if (!loaded) return <></>;
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="px-4 pt-9 pb-4 w-full box-border" onOpenAutoFocus={e => e.preventDefault()}>
        <div className="text-black font-bold text-2xl">结账</div>
        <div className="h-[calc(100vh-15rem)] box-border overflow-y-auto">
          {authContext.state.token ? (
            <div className="flex flex-col gap-4 mt-8">
              <div className="text-black font-bold flex items-center gap-2">
                <Icons.location className="w-5 h-5" /> <div>配送地址</div>
              </div>
              <div className={`w-full flex flex-col gap-2`}>
                <div className="flex gap-2">
                  <div className="w-full">
                    <input
                      placeholder="姓名"
                      defaultValue={authContext.state.me?.name || ""}
                      className={`w-full p-2 box-border outline-none rounded text-black bg-gray-100 border ${errors.shippingName ? "border-red-500" : ""}`}
                      {...register("shippingName")}
                    />
                    {errors.shippingName ? <div className=" text-red-500 text-sm">{errors.shippingName.message}</div> : null}
                  </div>
                  <div className="w-full">
                    <input
                      type="number"
                      placeholder="手机号"
                      defaultValue={authContext.state.me?.phone || ""}
                      className={`w-full p-2 box-border outline-none rounded text-black bg-gray-100 border ${errors.shippingPhone ? "border-red-500" : ""}`}
                      {...register("shippingPhone")}
                    />
                    {errors.shippingPhone ? <div className=" text-red-500 text-sm">{errors.shippingPhone.message}</div> : null}
                  </div>
                </div>
                {sku.type === SkuType.Physical ? (
                  <>
                    <div className="w-full">
                      <Controller
                        name="shippingArea"
                        control={control}
                        // {...register("area")}
                        defaultValue={authContext.state.me?.area || ""}
                        render={props => (
                          <AreaSelect
                            className={`w-full p-2 box-border outline-none rounded text-black bg-gray-100 border ${errors.shippingArea ? "border-red-500" : ""}`}
                            onChange={value => props.field.onChange(value)}
                            onBlur={() => props.field.onBlur()}
                            value={props.field.value || ""}
                          ></AreaSelect>
                        )}
                      />
                      {errors.shippingArea ? <div className=" text-red-500 text-sm">{errors.shippingArea.message}</div> : null}
                    </div>
                    <div className="w-full">
                      <input
                        defaultValue={authContext.state.me?.address || ""}
                        placeholder="收件人详细地址"
                        className={`w-full p-2 box-border outline-none rounded text-black bg-gray-100 border ${errors.shippingAddress ? "border-red-500" : ""}`}
                        {...register("shippingAddress")}
                      />
                      {errors.shippingAddress ? (
                        <div className=" text-red-500 text-sm">{errors.shippingAddress.message}</div>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          ) : null}
          <div className="flex flex-col mt-8 gap-2">
            <div className="text-black font-bold flex items-center gap-2">
              <Icons.product className="w-5 h-5" /> <div>商品明细</div>
            </div>
            <div className="box-border">
              <div className="flex flex-col gap-8 w-full box-border">
                <div className="flex box-border w-full min-w-0">
                  <Image
                    priority
                    width={480}
                    height={480}
                    src={getFileUrl(sku.fileId || "")}
                    alt=""
                    className="w-[120px] h-[120px] object-cover object-center border"
                  />
                  <div className=" pl-4 box-border min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="text-black font-bold text-ellipsis whitespace-nowrap flex-nowrap overflow-hidden leading-4">
                        {sku.title}
                      </div>
                      <div className="flex flex-col gap-4 mt-1 text-sm">
                        <div className="">
                          {sku.skuSpecValues?.reduce((previousValue, currentValue) => {
                            return `${previousValue}  ${currentValue.specValue?.specName?.name}: ${currentValue.specValue?.value}`;
                          }, "") || ""}
                        </div>
                      </div>

                      <AmountFormat value={sku.price!} size="sm" className="mt-2"></AmountFormat>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <BuyNumber
                        className="w-22"
                        maxValue={sku.stock!}
                        value={quantity}
                        onChange={value => {
                          setQuantity(value || 1);
                        }}
                      />
                    </div>
                    {error ? <div className=" text-sm text-red-500">{error}</div> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 flex flex-col gap-2">
          {/* <div className="flex justify-between items-center">
            <div className="text-sm">商品小计</div>
            <AmountFormat size="sm" value={skuAmount} />
          </div> */}
          <div className="flex justify-between items-center ">
            <div className="font-bold">合计</div>
            <AmountFormat value={(sku.price || 0) * quantity} />
          </div>
        </div>
        <Button
          className="w-full mt-4"
          disabled={loading}
          size="lg"
          onClick={async () => {
            if (loading) return;
            await handleSubmit(
              async data => {
                setLoading(true);
                const res = await graphqlRequest<{ createOrder: Order }>(
                  {
                    document: /* GraphQL */ `
                      mutation CreateOrder($input: OrderInput!) {
                        createOrder(input: $input) {
                          id
                        }
                      }
                    `,
                    variables: {
                      input: {
                        ...data,
                        skuId: sku.id,
                        quantity
                      }
                    }
                  },
                  { token: Cookies.get(tokenKey) || "" }
                );
                setLoading(false);
                if (res.errors) {
                  const error = res.errors[0];
                  if (error.extensions?.code === "OUT_OF_STOCK") {
                    const data = error.extensions?.data as { quantity: number; skuId: string };
                    setError(`最大数量：${data.quantity}`);
                  } else if (error.extensions?.code === "INVALID_PRODUCT") {
                    setError("商品无效");
                  }

                  return toast({ title: error.message, variant: "destructive" });
                }
                window.location.href = `/order/${res.data?.createOrder.id}?action=pay`;
                // 更新我的信息
                graphqlRequest<{ updateMe: User }>(
                  {
                    document: /* GraphQL */ `
                      mutation UpdateMe($input: UserInput!) {
                        updateMe(input: $input) {
                          id
                        }
                      }
                    `,
                    variables: {
                      input: {
                        name: data.shippingName,
                        phone: data.shippingPhone,
                        area: data.shippingArea,
                        address: data.shippingAddress
                      }
                    }
                  },
                  { token: Cookies.get(tokenKey) || "" }
                );
              }
              // error => {
              //   console.log(error);
              // }
            )();
          }}
        >
          结账
        </Button>
      </SheetContent>
    </Sheet>
  );
}
