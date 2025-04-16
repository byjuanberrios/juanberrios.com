import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://juanberrios.com',
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    '/blog': '/posts',
    "/blog/[post]": "/posts/[post]",
    "/bookmarks": "/links",
  },
  adapter: cloudflare(),
});