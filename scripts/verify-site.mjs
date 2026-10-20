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

for (const [route, html] of [
  ['/', rootHome],
  ['/zh/', zhHome],
]) {
  assert.match(html, /张屹綮/, `${route} must contain the Chinese name`);
  assert.match(html, /多模态/, `${route} must contain the Chinese multimodal positioning`);
}

assert.match(enHome, /Yiqing Zhang/, '/en/ must contain the English name');
assert.match(enHome, /multimodal/i, '/en/ must contain the English multimodal positioning');

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
