"use client";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/auth";
import { User, UserInput } from "@/generated/graphql";
import { tokenKey } from "@/utils/auth";
import { graphqlRequest } from "@/utils/request";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AreaSelect } from "../area-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

export function SettingForm() {
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  const form = useForm<{ name: string; phone: string; area: string; address: string }>({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, { message: "请输入姓名" }),
        phone: z.string().length(11, { message: "请输入11位手机号" }),
        area: z.string().min(1, { message: "请选择地区" }),
        address: z.string().min(1, { message: "请输入地址" })
      })
    )
  });
  const onSubmit = async (data: UserInput) => {
    if (loading) return;
    setLoading(true);
    const res = await graphqlRequest<{ updateMe: User }>(
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
            name: data.name,
            phone: data.phone,
            area: data.area,
            address: data.address
          }
        }
      },
      { token: Cookies.get(tokenKey) || "" }
    );
    setLoading(false);
    if (res.errors) {
      return toast({ title: res.errors[0].message, variant: "destructive" });
    }
    toast({ title: "提交成功" });
  };
  if (!loaded) return <></>;
  return (
    <div className="w-full py-10 flex flex-col justify-center items-center">
      <div className="text-center text-2xl font-bold">设置</div>
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          defaultValue={authContext.state.me?.name || ""}
          render={({ field }) => (
            <FormItem className="w-full max-w-sm mt-8">
              <FormLabel>姓名</FormLabel>
              <FormControl>
                <Input placeholder="请输入姓名" {...field} className="text-black bg-gray-100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          defaultValue={authContext.state.me?.phone || ""}
          render={({ field }) => (
            <FormItem className="w-full max-w-sm mt-4">
              <FormLabel>手机号</FormLabel>
              <FormControl>
                <Input placeholder="请输入手机号" {...field} className="text-black bg-gray-100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="area"
          defaultValue={authContext.state.me?.area || ""}
          render={({ field }) => (
            <FormItem className="w-full max-w-sm mt-4">
              <FormLabel>地区</FormLabel>
              <FormControl className="w-full">
                <AreaSelect
                  className={`w-full p-2 box-border outline-none rounded text-black bg-gray-100 border ${form.formState.errors.area ? "border-red-500" : ""}`}
                  onChange={value => field.onChange(value)}
                  onBlur={() => field.onBlur()}
                  value={field.value || ""}
                ></AreaSelect>
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          defaultValue={authContext.state.me?.address || ""}
          render={({ field }) => (
            <FormItem className="w-full max-w-sm mt-4">
              <FormLabel>地址</FormLabel>
              <FormControl>
                <Input placeholder="请输入地址" {...field} className="text-black bg-gray-100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full max-w-sm mt-8" onClick={form.handleSubmit(onSubmit)}>
          提交
        </Button>
      </Form>
    </div>
  );
}
