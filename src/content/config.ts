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

const playlistCollections = defineCollection({
  type: "data",
  schema: z.object({
    date: z.string().transform((str) => new Date(str)),
    name: z.string(),
    songs: z.number(),
    imageUrl: z.string(),
    platforms: z.object({
      spotifyLink: z.string().optional(),
      appleMusicLink: z.string().optional(),
      youtubeLink: z.string().optional(),
    }),
  }),
});

export const collections = {
  notes: notesCollections,
  now: nowCollections,
  playlists: playlistCollections,
};
