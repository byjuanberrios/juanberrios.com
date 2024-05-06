import { z, defineCollection } from "astro:content";

const notesCollections = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string().optional(),
    image: z.string().optional(),
  }),
});

const nowCollections = defineCollection({
  type: "content",
  schema: z.object({
    date: z.string(),
  }),
});

export const collections = {
  notes: notesCollections,
  now: nowCollections,
};
