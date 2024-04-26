import { BuyCard } from "@/components/checkout/buy-card";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { ProductImageSwiper } from "@/components/product/product-image-swiper";
import { Wechat } from "@/components/wechat";
import { getSetting } from "@/config/setting";
import { Spu } from "@/generated/graphql";
import { getFileUrl } from "@/utils";
import { getLogger } from "@/utils/logger";
import { graphqlRequest } from "@/utils/request";
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const spu = await loadSpuData(params.slug);
  const setting = await getSetting();
  return {
    title: `${spu?.title} - ${setting?.name} - ${setting?.title}`
  };
}

const loadSpuData = async (id: string) => {
  const res = await graphqlRequest<{ spu: Spu }>({
    document: /* GraphQL */ `
      query Spu($query: SpuQuery!) {
        spu(query: $query) {
          id
          title
          content
          publishedAt
          attrs {
            id
            name
            value
          }
          specNames {
            id
            name
            specValues {
              id
              value
            }
          }
          skus {
            id
            type
            title
            fileId
            skuFiles {
              id
              fileId
            }
            stock
            price

            skuSpecValues {
              id
              specValueId
              specValue {
                id
                specNameId
                value
                specName {
                  id
                  name
                }
              }
            }
          }
        }
      }
    `,
    variables: { query: { id } }
  });
  if (res.errors) {
    getLogger().error(res.errors);
    return undefined;
  }
  return res.data?.spu;
};
// { searchParams: { page?: string }
export default async function Page({ params, searchParams }: { params: { slug: string }; searchParams: { skuId: string } }) {
  const setting = await getSetting();
  const spu = await loadSpuData(params.slug);
  if (!spu) {
    return <></>;
  }
  let skuId = searchParams.skuId;
  if (!skuId) {
    skuId = spu.skus ? spu.skus[0]?.id || "" : "";
  }
  const sku = spu.skus?.find(v => v.id === skuId);
  if (!sku) return <></>;
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="lg:container flex flex-wrap lg:gap-8 lg:flex-nowrap lg:mt-8">
          <ProductImageSwiper medias={sku.skuFiles || []} />
          <BuyCard spu={spu} sku={sku} />
        </div>
        <div className="container mt-8">
          <div className="border-b p-4 text-center font-bold">商品介绍</div>
          {spu.attrs?.length ? (
            <div className="p-4 grid grid-cols-2 gap-4 lg:grid-cols-4 border-b">
              {spu.attrs?.map((v, k) => (
                <div key={k} className="flex gap-1">
                  <div>{v.name}：</div>
                  <div>{v.value}</div>
                </div>
              ))}
            </div>
          ) : null}
          <div className="mt-4 wysiwyg" dangerouslySetInnerHTML={{ __html: spu.content || "" }}></div>
        </div>
      </main>
      <SiteFooter />
      <Wechat
        shareConfig={{
          title: `${sku.title} - ${setting?.name} - ${setting?.title}`,
          desc: setting?.description || "",
          imgUrl: getFileUrl(sku.fileId || "", { w: 800, h: 800 })
        }}
      />
    </div>
  );
}
