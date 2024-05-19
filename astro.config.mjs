import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), icon(), react()],
  redirects: {
    '/blog': '/notes',
    '/posts': '/notes',
    "/blog/[note]": "/notes/[note]",
    "/posts/[note]": "/notes/[note]"
  }
});