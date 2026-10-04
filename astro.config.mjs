import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({site: process.env.SITE_URL || 'https://marketing-demo-topaz.vercel.app', output:'static', build:{inlineStylesheets:'always'}, trailingSlash:'always', integrations:[sitemap({filter: (page) => !page.endsWith('/404/')})], image:{responsiveStyles:true}, vite:{build:{cssMinify:true}}});
