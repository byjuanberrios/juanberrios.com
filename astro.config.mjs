
import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://juanberrios.com',
  integrations: [mdx(), icon(), react()],
  redirects: {
    '/blog': '/notes',
    '/posts': '/notes',
    "/blog/[note]": "/notes/[note]",
    "/posts/[note]": "/notes/[note]"
  },
  output: "hybrid",
  adapter: cloudflare()
});