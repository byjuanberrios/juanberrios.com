import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  redirects: {
    '/blog': '/notes',
    '/posts': '/notes',
    "/blog/[note]": "/notes/[note]",
    "/posts/[note]": "/notes/[note]"
  }
});