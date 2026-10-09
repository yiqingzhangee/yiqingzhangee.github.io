// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // Override with SITE_URL in GitHub Actions or when using a custom domain.
  site: import.meta.env.SITE_URL ?? 'http://localhost:4321',
});
