import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const distDirectory = new URL('../dist/', import.meta.url);
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
}

const rootHome = await readFile(new URL('index.html', distDirectory), 'utf8');
const zhHome = await readFile(new URL('zh/index.html', distDirectory), 'utf8');
const enHome = await readFile(new URL('en/index.html', distDirectory), 'utf8');
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

function assertImpactHasNoFigures(route, html) {
  const impactSection = html.match(
    /<section class="section-band section-impact"[\s\S]*?<\/section>/,
  )?.[0];

  assert.ok(impactSection, `${route} must render the selected-impact section`);

  const projects = [...impactSection.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(([, project]) => project);

  assert.equal(
    projects.length,
    3,
    `${route} selected-impact section must render exactly three projects`,
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
