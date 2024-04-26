"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { runtime } from "@/utils";
import Link from "next/link";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "请输入姓名"
  }),
  phone: z.string().length(11, {
    message: "请输入11位手机号"
  }),
  code: z.string().length(6, {
    message: "请输入6位手机号"
  })
});

export const RegisterForm = () => {
  const search = runtime === "client" ? window.location.search : "";
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
      code: ""
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const t = toast({
      title: "注册成功，密码已发送至你的手机号",
      action: (
        <Link
          href={`/auth/login${search}`}
          className=" inline-block px-4 py-1 rounded bg-primary text-white hover:opacity-80 active:opacity-80"
          onClick={() => {
            t.dismiss();
          }}
        >
          去登录
        </Link>
      )
    });
  }
  return (
    <div className="w-full py-20 flex flex-col justify-center items-center">
      <div className="text-center text-2xl font-bold">注册</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:w-[25rem] mt-10">
          <div className=" flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Username</FormLabel> */}
                  <FormControl>
                    <Input placeholder="姓名" {...field} className="text-black bg-gray-100" />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Username</FormLabel> */}
                  <FormControl>
                    <div>
                      <Input placeholder="手机号" {...field} className="text-black bg-gray-100" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Username</FormLabel> */}
                  <FormControl>
                    <div className="flex gap-4">
                      <Input placeholder="验证码" {...field} className="text-black bg-gray-100" />
                      <Button type="button">发送验证码</Button>
                    </div>
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button type="submit" className="w-full mt-8" onClick={form.handleSubmit(onSubmit)}>
              注册
            </Button>
            <Link href={`/auth/login${search}`} className=" mt-2 inline-flex underline text-sm text-gray-500">
              已有账号？立即登录
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
