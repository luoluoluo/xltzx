import { ArticleItem } from "@/components/article/article-item";
import { Empty } from "@/components/empty";
import { BusinessCard } from "@/components/home/business-card";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { ProductItem } from "@/components/product/product-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wechat } from "@/components/wechat";
import { getSetting } from "@/config/setting";
import { ArticlePagination, ArticleQuery, SpuPagination, SpuQuery } from "@/generated/graphql";
import { getFileUrl } from "@/utils";
import { getLogger } from "@/utils/logger";
import { graphqlRequest } from "@/utils/request";

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

const loadArticleData = async (query: ArticleQuery) => {
  const res = await graphqlRequest<{ articles: ArticlePagination }>({
    document: /* GraphQL */ `
      query Articles($query: ArticleQuery!) {
        articles(query: $query) {
          edges {
            id
            fileId
            title
            createdAt
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
  return res.data?.articles.edges;
};

export default async function Page() {
  const setting = await getSetting();
  const spus = await loadSpuData({ offset: 0, limit: 8 });
  const articles = await loadArticleData({ offset: 0, limit: 8 });
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container lg:flex lg:gap-8">
          <div className="w-full lg:w-[400px] flex-shrink-0 ">
            <BusinessCard setting={setting} />
          </div>
          <Tabs defaultValue="product" className=" mt-8 w-full">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="product">
                产品
              </TabsTrigger>
              <TabsTrigger className="w-full" value="article">
                文章
              </TabsTrigger>
            </TabsList>
            <TabsContent value="product">
              <div>
                {spus && spus.length ? (
                  <div className="w-full grid flex-1 grid-cols-2 gap-4 mt-4">
                    {spus?.map(v => {
                      return <ProductItem key={v.id} data={v}></ProductItem>;
                    })}
                  </div>
                ) : (
                  <Empty title="暂无产品" className="min-h-[20rem]"></Empty>
                )}
              </div>
            </TabsContent>
            <TabsContent value="article">
              {articles && articles.length ? (
                <div className="w-full grid flex-1 grid-cols-2 gap-4 mt-4">
                  {articles?.map(v => {
                    return <ArticleItem key={v.id} data={v}></ArticleItem>;
                  })}
                </div>
              ) : (
                <Empty title="暂无文章" className="min-h-[20rem]"></Empty>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
      <Wechat
        shareConfig={{
          title: `${setting?.name} - ${setting?.title}`,
          desc: setting?.description || "",
          imgUrl: getFileUrl(setting?.logoFileId || "")
        }}
      />
    </div>
  );
}
