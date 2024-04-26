import { Empty } from "@/components/empty";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { OrderItem } from "@/components/order/order-item";
import { OrderStateTabs } from "@/components/order/order-state-tabs";
import { Pagination } from "@/components/ui/pagination";
import { getSetting } from "@/config/setting";
import { OrderPagination, OrderQuery, OrderState } from "@/generated/graphql";
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
const loadOrderData = async (query: OrderQuery) => {
  const res = await graphqlRequest<{ orders: OrderPagination }>(
    {
      document: /* GraphQL */ `
        query Orders($query: OrderQuery!) {
          orders(query: $query) {
            edges {
              id
              amount
              skuId
              title
              spec
              fileId
              price
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
            totalCount
          }
        }
      `,
      variables: { query }
    },
    { token: headers().get(tokenKey) || "" }
  );
  if (res.errors) {
    getLogger().error(res.errors);
    return undefined;
  }
  return res.data?.orders;
};
export default async function Page({ searchParams }: { searchParams: { page?: string; state?: OrderState } }) {
  const page = Number(searchParams.page || "1");
  const query: OrderQuery = {
    limit: 5,
    state: searchParams.state
  };
  const orders = await loadOrderData({ ...query, offset: (page - 1) * query.limit! });
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container">
        <OrderStateTabs value={searchParams.state} className="mt-4" />
        {orders?.edges?.length ? (
          <>
            <div className="flex flex-col gap-8 mt-8">
              {orders?.edges?.map(v => <OrderItem key={v.id} order={v}></OrderItem>)}
            </div>
            <Pagination page={page} size={query.limit!} count={orders?.totalCount!} className="mt-4"></Pagination>
          </>
        ) : (
          <Empty title="暂无订单" className="min-h-[20rem]"></Empty>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
