import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

export default defineConfig({
  site: 'https://emagrecer.xx.kg',
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
    compress({
      CSS: true,
      HTML: {
        'collapse-whitespace': true,
        'remove-comments': true,
        'minify-css': true,
        'minify-js': true,
      },
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  compressHTML: true,
});