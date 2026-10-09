import { getCollection, type CollectionEntry } from 'astro:content';

export type Locale = 'zh' | 'en';
export type ArticleKind = 'posts' | 'reviews';
type Article = CollectionEntry<ArticleKind>;

export async function getArticles(kind: ArticleKind, lang: Locale): Promise<Article[]> {
  const articles = await getCollection(kind, ({ data }) => !data.draft && data.lang === lang);
  return articles.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getTranslation(
  kind: ArticleKind,
  translationKey: string,
  lang: Locale,
): Promise<Article | undefined> {
  const articles = await getCollection(kind, ({ data }) => (
    !data.draft && data.lang === lang && data.translationKey === translationKey
  ));
  return articles[0];
}

export function articlePath(kind: ArticleKind, lang: Locale, id: string): string {
  return `/${lang}/${kind}/${id.replace(`${lang}/`, '')}/`;
}
