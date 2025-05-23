import ArticleContentWrapper from "@/components/article/ArticleContentWrapper";

export default async function DynamicArticlePage({ params }) {
  const { slug } = await params;
  return <ArticleContentWrapper slug={slug} />;
}
