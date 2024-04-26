"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils";
import Link from "next/link";

export const OrderStateTabs = ({ value, className }: { value?: string; className?: string }) => {
  return (
    <Tabs defaultValue={value || "all"} className={cn("w-full", className)}>
      <TabsList>
        <TabsTrigger value="all" asChild>
          <Link href="/order">全部</Link>
        </TabsTrigger>
        <TabsTrigger value="created" asChild>
          <Link href="/order?state=created">待支付</Link>
        </TabsTrigger>
        <TabsTrigger value="paid" asChild>
          <Link href="/order?state=paid">待发货</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
