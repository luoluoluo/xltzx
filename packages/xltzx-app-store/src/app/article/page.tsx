import { ArticleItem } from "@/components/article/article-item";
import { Empty } from "@/components/empty";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { BannerSwiper } from "@/components/product/banner-swiper";
import { Pagination } from "@/components/ui/pagination";
import { Wechat } from "@/components/wechat";
import { getSetting } from "@/config/setting";
import { ArticlePagination, ArticleQuery, BannerPagination } from "@/generated/graphql";
import { getFileUrl } from "@/utils";
import { getLogger } from "@/utils/logger";
import { graphqlRequest } from "@/utils/request";

export async function generateMetadata() {
  const setting = await getSetting();
  return {
    title: `全部文章 - ${setting?.name} - ${setting?.title}`
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
  return res.data?.articles;
};
export default async function Page({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page || "1");
  const setting = await getSetting();
  const query: ArticleQuery = {
    limit: 16
  };
  const articlePaginate = await loadArticleData({ ...query, offset: (page - 1) * query.limit! });
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
              全部文章
            </div>
          </div>
          {articlePaginate?.edges && articlePaginate.edges.length ? (
            <>
              <div className="w-full grid flex-1 grid-cols-2 gap-4 lg:gap-8 lg:grid-cols-4 mt-8">
                {articlePaginate.edges?.map(v => {
                  return <ArticleItem key={v.id} data={v}></ArticleItem>;
                })}
              </div>
              <Pagination page={page} size={query.limit!} count={articlePaginate?.totalCount!} className="mt-4"></Pagination>
            </>
          ) : (
            <Empty title="暂无文章" className="min-h-[20rem]"></Empty>
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
