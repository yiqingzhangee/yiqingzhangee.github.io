# Yiqing's Notebook

A bilingual (中文 / English) static personal website for technical writing and reviews, built with Astro and deployed to GitHub Pages.

## Local development

```bash
npm ci
npm run dev
```

Run validation and create the static output:

```bash
npm run check
npm run build
```

## Writing

- Technical posts live in `src/content/posts/{zh,en}/`.
- Reviews live in `src/content/reviews/{zh,en}/`.
- Each entry needs the frontmatter defined in `src/content.config.ts`.
- Pair translations with the same `translationKey`. A post may be published in only one language; the article-level language link appears when its counterpart exists.

## Deploying to GitHub Pages

1. Create or rename the GitHub repository to `<your-github-username>.github.io`.
2. Push the `main` branch.
3. In GitHub repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` publishes every push to `main`.

The deploy workflow derives the account Pages URL from the repository owner. For a custom domain, set `SITE_URL` to that HTTPS domain in the workflow and add `public/CNAME`.
