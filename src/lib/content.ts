import { getCollection, type CollectionEntry } from 'astro:content';

export type Locale = 'zh' | 'en';
export type ArticleKind = 'posts' | 'reviews';
type Article<C extends ArticleKind = ArticleKind> = CollectionEntry<C>;
export type WritingEntry = (
  | (CollectionEntry<'posts'> & { kind: 'posts' })
  | (CollectionEntry<'reviews'> & { kind: 'reviews' })
);

export async function getArticles<C extends ArticleKind>(
  kind: C,
  lang: Locale,
): Promise<Article<C>[]> {
  const articles = await getCollection(kind, ({ data }) => !data.draft && data.lang === lang);
  return articles.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getWriting(lang: Locale): Promise<WritingEntry[]> {
  const [posts, reviews] = await Promise.all([
    getCollection('posts', ({ data }) => !data.draft && data.lang === lang),
    getCollection('reviews', ({ data }) => !data.draft && data.lang === lang),
  ]);

  return [
    ...posts.map((entry) => ({ ...entry, kind: 'posts' as const })),
    ...reviews.map((entry) => ({ ...entry, kind: 'reviews' as const })),
  ].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
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
