// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // Override with SITE_URL in GitHub Actions or when using a custom domain.
  site: loadEnv('', false, 'SITE_URL').SITE_URL ?? 'http://localhost:4321',
});
