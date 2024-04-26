import { Empty } from "@/components/empty";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { BannerSwiper } from "@/components/product/banner-swiper";
import { ProductItem } from "@/components/product/product-item";
import { Wechat } from "@/components/wechat";
import { getSetting } from "@/config/setting";
import { BannerPagination, SpuPagination, SpuQuery } from "@/generated/graphql";
import { getFileUrl } from "@/utils";
import { getLogger } from "@/utils/logger";
import { graphqlRequest } from "@/utils/request";

export async function generateMetadata() {
  const setting = await getSetting();
  return {
    title: `全部商品 - ${setting?.name} - ${setting?.title}`
  };
}

const loadBannerData = async () => {
  const res = await graphqlRequest<{ banners: BannerPagination }>({
    document: /* GraphQL */ `
      query Banners($query: BannerQuery!) {
        banners(query: $query) {
          edges {
            id
            title
            link
            fileId
          }
          totalCount
        }
      }
    `,
    variables: { query: {} }
  });
  return res.data?.banners.edges;
};

const loadSpuData = async (query: SpuQuery) => {
  const res = await graphqlRequest<{ spus: SpuPagination }>({
    document: /* GraphQL */ `
      query Spus($query: SpuQuery!) {
        spus(query: $query) {
          edges {
            id
            fileId
            title
            skuId
            sku {
              id
              price
            }
          }
          totalCount
        }
      }
    `,
    variables: { query }
  });
  if (res.errors) {
    getLogger().error(res.errors);
    return undefined;
  }
  return res.data?.spus.edges;
};
export default async function Page({ searchParams }: { searchParams: { id?: string } }) {
  const setting = await getSetting();
  const spus = await loadSpuData({ id: searchParams.id });
  const banners = await loadBannerData();
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <BannerSwiper data={banners || []} />
        <div className="container mt-8">
          <div className="w-full flex items-center justify-center relative h-[2rem] lg:h-[3rem]">
            <div className="bg-primary h-[2px] w-full"></div>
            <div className=" absolute flex items-center justify-center text-white font-bold bg-primary w-[40%] lg:w-[30%] h-[2.5rem]">
              全部产品
            </div>
          </div>
          {spus && spus.length ? (
            <div className="w-full grid flex-1 grid-cols-2 gap-4 lg:gap-8 lg:grid-cols-4 mt-8">
              {spus?.map(v => {
                return <ProductItem key={v.id} data={v}></ProductItem>;
              })}
            </div>
          ) : (
            <Empty title="暂无商品" className="min-h-[20rem]"></Empty>
          )}
        </div>
      </main>
      <SiteFooter />
      <Wechat
        shareConfig={{
          title: `${setting?.name} - ${setting?.title}` || "",
          desc: setting?.description || "",
          imgUrl: getFileUrl(setting?.logoFileId || "")
        }}
      />
    </div>
  );
}
