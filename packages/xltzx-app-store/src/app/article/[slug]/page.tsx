import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { Wechat } from "@/components/wechat";
import { getSetting } from "@/config/setting";
import { ArticleQuery, Article as ContentArticle } from "@/generated/graphql";
import { getFileUrl } from "@/utils";
import { getLogger } from "@/utils/logger";
import { graphqlRequest } from "@/utils/request";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await loadArticleData({ id: params.slug || "" });
  const setting = await getSetting();
  return {
    title: `${article?.title} - ${setting?.name} - ${setting?.title}`
  };
}
const loadArticleData = async (query: ArticleQuery) => {
  const res = await graphqlRequest<{ article: ContentArticle }>({
    document: /* GraphQL */ `
      query Article($query: ArticleQuery!) {
        article(query: $query) {
          id
          title
          content
        }
      }
    `,
    variables: { query }
  });
  if (res.errors) {
    getLogger().error(res.errors);
    return undefined;
  }
  return res.data?.article;
};
// { searchParams: { article?: string }
export default async function Page({ params }: { params: { slug: string } }) {
  const setting = await getSetting();
  const article = await loadArticleData({ id: params.slug });
  if (!article) {
    return <></>;
  }
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container">
          <div className="mt-8 p-4 text-center font-bold text-xl">{article.title}</div>
          <div className="mt-8 ProseMirror" dangerouslySetInnerHTML={{ __html: article.content || "" }}></div>
        </div>
      </main>
      <SiteFooter />
      <Wechat
        shareConfig={{
          title: `${article.title} - ${setting?.name} - ${setting?.title}`,
          desc: setting?.description || "",
          imgUrl: getFileUrl(article.fileId || "", { w: 800, h: 800 })
        }}
      />
    </div>
  );
}
