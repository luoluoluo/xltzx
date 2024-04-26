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
  phone: z.string().length(11, {
    message: "请输入11位手机号"
  }),
  code: z.string().length(6, {
    message: "请输入6位手机号"
  })
});

export const LoginForm = () => {
  const search = runtime === "client" ? window.location.search : "";
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      code: ""
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      variant: "destructive",
      title: "You submitted the following values:"
    });
    const u = new URL(window.location.href);
    const redirectUrl = u.searchParams.get("url");
    window.location.href = redirectUrl || "/";
  }
  return (
    <div className="w-full py-20 flex flex-col justify-center items-center">
      <div className="text-center text-2xl font-bold">登录</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:w-[25rem] mt-10">
          <div className=" flex flex-col gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Username</FormLabel> */}
                  <FormControl>
                    <Input placeholder="手机号" {...field} className="text-black bg-gray-100" />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
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
              {/* <Link href={`/auth/forget${window.location.search}`} className=" inline-flex mt-2 underline text-sm text-primary">
                忘记密码？
              </Link> */}
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full mt-8" onClick={form.handleSubmit(onSubmit)}>
              登录
            </Button>
            <Link href={`/auth/register${search}`} className=" mt-2 inline-flex underline text-sm text-gray-500">
              没有账号？快速注册
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
