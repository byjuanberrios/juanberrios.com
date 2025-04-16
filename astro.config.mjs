import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

import vtbot from "astro-vtbot";

export default defineConfig({
  site: 'https://juanberrios.com',
  integrations: [mdx(), react(), vtbot({
      autoLint: true,
      progressBar: true
  })],
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