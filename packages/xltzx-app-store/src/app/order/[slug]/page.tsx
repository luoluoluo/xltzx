import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { OrderItem } from "@/components/order/order-item";
import { getSetting } from "@/config/setting";
import { Order } from "@/generated/graphql";
import { tokenKey } from "@/utils/auth";
import { getLogger } from "@/utils/logger";
import { graphqlRequest } from "@/utils/request";
import { headers } from "next/headers";

export async function generateMetadata() {
  const setting = await getSetting();
  return {
    title: `我的订单 - ${setting?.name} - ${setting?.title}`
  };
}

const loadOrderData = async (id: string) => {
  const res = await graphqlRequest<{ order: Order }>(
    {
      document: /* GraphQL */ `
        query Order($query: OrderQuery!) {
          order(query: $query) {
            id
            skuId
            title
            amount
            price
            spec
            fileId
            quantity
            shippingName
            shippingPhone
            shippingArea
            shippingAddress
            expressCode
            expressCompany
            state
            createdAt
            canceledAt
            paidAt
            shippedAt
            paidAt
            refundedAt
            shippedAt
          }
        }
      `,
      variables: { query: { id } }
    },
    { token: headers().get(tokenKey) || "" }
  );
  if (res.errors) {
    getLogger().error(res.errors);
    return undefined;
  }
  return res.data?.order;
};
export default async function Page({ params, searchParams }: { params: { slug: string }; searchParams: { action?: "pay" } }) {
  const order = await loadOrderData(params.slug);
  if (!order) {
    return <></>;
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container">
        <OrderItem order={order} className="mt-8" pay={searchParams.action === "pay"}></OrderItem>
      </main>
      <SiteFooter />
    </div>
  );
}
