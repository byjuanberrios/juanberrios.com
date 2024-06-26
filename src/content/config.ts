import { z, defineCollection } from "astro:content";

const notesCollections = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string().optional(),
    image: z.string().optional(),
    isPublished: z.boolean(),
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

const worksCollections = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      year: z.number(),
      cover: image(),
      // images: z.array(image()),
    }),
});

export const collections = {
  notes: notesCollections,
  playlists: playlistCollections,
  works: worksCollections,
};
