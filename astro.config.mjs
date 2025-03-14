import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://juanberrios.com',
  integrations: [mdx(), icon(), react()],
  redirects: {
    '/blog': '/posts',
    "/blog/[post]": "/posts/[post]",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: cloudflare()
});