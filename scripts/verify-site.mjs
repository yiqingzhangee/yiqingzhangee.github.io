import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const distDirectory = new URL('../dist/', import.meta.url);
const expectedSiteOrigin = new URL(
  process.env.SITE_URL ?? 'http://localhost:4321',
).origin;
const requiredRoutes = [
  ['/', 'index.html'],
  ['/zh/', 'zh/index.html'],
  ['/en/', 'en/index.html'],
  ['/zh/about/', 'zh/about/index.html'],
  ['/en/about/', 'en/about/index.html'],
  ['/zh/writing/', 'zh/writing/index.html'],
  ['/en/writing/', 'en/writing/index.html'],
];

for (const [route, file] of requiredRoutes) {
  await assert.doesNotReject(
    access(new URL(file, distDirectory)),
    `Missing generated route: ${route} (${file})`,
  );

  const html = await readFile(new URL(file, distDirectory), 'utf8');
  const canonicalLink = html.match(
    /<link\b(?=[^>]*\brel="canonical")(?=[^>]*\bhref="[^"]+")[^>]*>/,
  )?.[0];
  const canonicalHref = canonicalLink?.match(/\bhref="([^"]+)"/)?.[1];

  assert.equal(
    canonicalHref,
    `${expectedSiteOrigin}${route}`,
    `${route} canonical URL must use ${expectedSiteOrigin}`,
  );
}

const rootHome = await readFile(new URL('index.html', distDirectory), 'utf8');
const zhHome = await readFile(new URL('zh/index.html', distDirectory), 'utf8');
const enHome = await readFile(new URL('en/index.html', distDirectory), 'utf8');
const zhAbout = await readFile(new URL('zh/about/index.html', distDirectory), 'utf8');
const enAbout = await readFile(new URL('en/about/index.html', distDirectory), 'utf8');
const zhWriting = await readFile(new URL('zh/writing/index.html', distDirectory), 'utf8');
const enWriting = await readFile(new URL('en/writing/index.html', distDirectory), 'utf8');
const zhPosts = await readFile(new URL('zh/posts/index.html', distDirectory), 'utf8');
const enPosts = await readFile(new URL('en/posts/index.html', distDirectory), 'utf8');
const zhReviews = await readFile(new URL('zh/reviews/index.html', distDirectory), 'utf8');
const enReviews = await readFile(new URL('en/reviews/index.html', distDirectory), 'utf8');

for (const [route, html] of [
  ['/', rootHome],
  ['/zh/', zhHome],
]) {
  assert.match(html, /张屹綮/, `${route} must contain the Chinese name`);
  assert.match(html, /多模态/, `${route} must contain the Chinese multimodal positioning`);
}

assert.match(enHome, /Yiqing Zhang/, '/en/ must contain the English name');
assert.match(enHome, /multimodal/i, '/en/ must contain the English multimodal positioning');

function assertLocaleLink(route, html, alternateLang, alternateHref) {
  const escapedHref = alternateHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const localeLink = new RegExp(
    `<a\\b(?=[^>]*\\bhref="${escapedHref}")(?=[^>]*\\blang="${alternateLang}")[^>]*>`,
  );

  assert.match(
    html,
    localeLink,
    `${route} locale switch must link to ${alternateHref}`,
  );
}

for (const [route, html, alternateLang, alternateHref] of [
  ['/', rootHome, 'en', '/en/'],
  ['/zh/', zhHome, 'en', '/en/'],
  ['/en/', enHome, 'zh', '/'],
  ['/zh/about/', zhAbout, 'en', '/en/about/'],
  ['/en/about/', enAbout, 'zh', '/zh/about/'],
  ['/zh/writing/', zhWriting, 'en', '/en/writing/'],
  ['/en/writing/', enWriting, 'zh', '/zh/writing/'],
]) {
  assertLocaleLink(route, html, alternateLang, alternateHref);
}

function assertImpactHasNoFigures(route, html) {
  const impactSection = html.match(
    /<section class="section-band section-impact"[\s\S]*?<\/section>/,
  )?.[0];

  assert.ok(impactSection, `${route} must render the selected-impact section`);

  const projects = [...impactSection.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(([, project]) => project);

  assert.equal(
    projects.length,
    6,
    `${route} selected-impact section must render exactly six projects`,
  );

  for (const project of projects) {
    const paragraphs = [...project.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)];

    assert.equal(
      paragraphs.length,
      1,
      `${route} each selected project must include exactly one summary paragraph`,
    );
    assert.match(
      paragraphs[0][1],
      /\S/,
      `${route} each selected project summary paragraph must be non-empty`,
    );
  }

  assert.doesNotMatch(
    impactSection,
    /<img\b/,
    `${route} selected-impact section must not contain images`,
  );
  assert.doesNotMatch(
    impactSection,
    /<figure\b/,
    `${route} selected-impact section must not contain figures`,
  );
  assert.doesNotMatch(
    impactSection,
    /\brole="img"/,
    `${route} selected-impact section must not contain image roles`,
  );
  assert.doesNotMatch(
    impactSection,
    /\bimpact-(?:figure|schematic)\b/,
    `${route} selected-impact section must not contain impact schematic markup`,
  );
}

assertImpactHasNoFigures('/', rootHome);
assertImpactHasNoFigures('/zh/', zhHome);
assertImpactHasNoFigures('/en/', enHome);

function assertPublicationIntroductions(route, html, sectionPattern) {
  const section = html.match(sectionPattern)?.[0];

  assert.ok(section, `${route} must render the selected-publications section`);

  const publicationList = section.match(
    /<ol\b[^>]*\bclass="[^"]*\bpublication-list\b[^"]*"[^>]*>([\s\S]*?)<\/ol>/,
  )?.[1];

  assert.notEqual(publicationList, undefined, `${route} must render a publication list`);

  const publications = [...publicationList.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(([, publication]) => publication);

  assert.equal(
    publications.length,
    6,
    `${route} selected-publications section must render exactly six papers`,
  );

  for (const publication of publications) {
    assert.match(
      publication,
      /<p\b[^>]*\bclass="[^"]*\bpublication-summary\b[^"]*"[^>]*>\s*\S[\s\S]*?<\/p>/,
      `${route} each selected paper must include a non-empty research introduction`,
    );
  }
}

for (const [route, html] of [
  ['/', rootHome],
  ['/zh/', zhHome],
  ['/en/', enHome],
]) {
  assertPublicationIntroductions(
    route,
    html,
    /<section class="section-band section-research"[\s\S]*?<\/section>/,
  );
}

for (const [route, html] of [
  ['/zh/about/', zhAbout],
  ['/en/about/', enAbout],
]) {
  assertPublicationIntroductions(
    route,
    html,
    /<section aria-labelledby="publications-title">[\s\S]*?<\/section>/,
  );
}

function assertWritingListDescriptions(route, html) {
  const articleList = html.match(/<ul\b[^>]*\bclass="[^"]*\barticle-list\b[^"]*"[^>]*>([\s\S]*?)<\/ul>/)?.[1];

  assert.notEqual(articleList, undefined, `${route} must render an article list`);

  const rows = [...articleList.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(([, row]) => row);

  for (const row of rows) {
    assert.match(
      row,
      /<p>\s*\S[\s\S]*?<\/p>/,
      `${route} each writing-list row must include a non-empty description`,
    );
  }
}

for (const [route, html] of [
  ['/zh/writing/', zhWriting],
  ['/en/writing/', enWriting],
  ['/zh/posts/', zhPosts],
  ['/en/posts/', enPosts],
  ['/zh/reviews/', zhReviews],
  ['/en/reviews/', enReviews],
]) {
  assertWritingListDescriptions(route, html);
}

for (const [route, html] of [
  ['/zh/writing/', zhWriting],
  ['/en/writing/', enWriting],
]) {
  assert.match(
    html,
    /href="\/(?:zh|en)\/reviews\/enterprise-agent-security-lifecycle\/"/,
    `${route} must link to the agent-security review`,
  );
}

assert.doesNotMatch(
  zhPosts,
  /从一篇文章开始：双语技术博客的最小工作流/,
  '/zh/posts/ must not contain the removed bilingual-workflow article',
);
assert.doesNotMatch(
  enPosts,
  /Start with one post: a minimal workflow for bilingual writing/,
  '/en/posts/ must not contain the removed bilingual-workflow article',
);

async function collectHtml(directory) {
  const files = [];

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryUrl = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);

    if (entry.isDirectory()) {
      files.push(...(await collectHtml(entryUrl)));
    } else if (entry.name.endsWith('.html')) {
      files.push(entryUrl);
    }
  }

  return files;
}

const generatedHtml = (
  await Promise.all(
    (await collectHtml(distDirectory)).map((file) => readFile(file, 'utf8')),
  )
).join('\n');

assert.match(
  generatedHtml,
  /AI 智能体全生命周期智能攻防体系/,
  'Generated output must contain the featured agent-security review',
);
assert.doesNotMatch(
  generatedHtml,
  /从一篇文章开始：双语技术博客的最小工作流/,
  'Generated output must not contain the removed bilingual-workflow article',
);

console.log('Generated site verification passed.');
