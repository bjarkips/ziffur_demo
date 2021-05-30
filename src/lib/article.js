import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import unified from 'unified';
import markdown from 'remark-parse';
import math from 'remark-math';
import remark2rehype from 'remark-rehype';
import katex from 'rehype-katex';
import stringify from 'rehype-stringify';
import highlight from 'remark-highlight.js';
import { getCategoryUrl } from './category';

const articlesDirectory = path.join(process.cwd(), 'articles');

export function getAllSlugs() {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map(
    (fileName) => fileName.replace(/\.md$/, ''),
  );
}

export async function getArticle(slug, maxLength) {
  const articlePath = path.join(articlesDirectory, `${slug}.md`);
  const file = fs.readFileSync(articlePath, 'utf8');
  const { data, content } = matter(file);
  const contentHtml = await unified()
    .use(markdown)
    .use(math)
    .use(highlight)
    .use(remark2rehype)
    .use(katex)
    .use(stringify)
    .process(maxLength ? content.substring(0, maxLength) : content);
  return {
    slug,
    content: contentHtml.toString(),
    url: `/article/${slug}`,
    categoryUrl: getCategoryUrl(data.category),
    ...{
      ...data,
      tags: [data.category, ...data.tags],
    },
  };
}

const sortByDateAsc = (a, b) => Date.parse(b.date) - Date.parse(a.date);

export async function getAllArticles() {
  const slugs = getAllSlugs();
  const articles = await Promise.all(
    slugs.map(
      async (slug) => {
        const article = await getArticle(slug, 500);
        return article;
      },
    ),
  );
  return articles
    .sort(sortByDateAsc)
    .filter((article) => Date.parse(article.date) < Date.now());
}
