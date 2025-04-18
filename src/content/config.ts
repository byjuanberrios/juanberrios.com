import { z, defineCollection } from "astro:content";

const postsCollections = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string().optional(),
    image: z.string().optional(),
    isPublished: z.boolean(),
  }),
});

const worksCollections = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      slug: z.string(),
      year: z.number(),
      cover: image(),
      roles: z.array(z.string()),
      services: z.array(z.string()),
      tech: z.array(z.string()),
      client: z.string(),
      description: z.array(z.string()),
      externalLink: z.string().optional(),
      images: z.array(image()).optional(),
      archived: z.boolean().optional(),
      priority: z.number().optional().default(999),
    }),
});

export const collections = {
  posts: postsCollections,
  works: worksCollections,
};
