import { Client } from "@notionhq/client";
import { slugify } from "../utils/slugify.astro";

export type Album = {
  artist: string;
  name: string;
  cover: any;
  year: number;
  slug: string;
  tracklist?: string;
  description?: string;
};

export async function getAlbums(): Promise<Album[]> {
  const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });
  const pages: any = await notion.databases.query({
    database_id: import.meta.env.NOTION_DATABASE_ID,
  });

  const albums = pages.results.map((result: any) => {
    const tracklist = result.properties.Tracklist.rich_text[0];
    const description = result.properties.Description.rich_text[0];
    const album = {
      artist: result.properties.Artist.rich_text[0].plain_text,
      name: result.properties.Name.title[0].plain_text,
      cover: result.properties["Cover image"].rich_text[0].plain_text,
      year: result.properties.Year.number,
      slug: slugify(
        `${result.properties.Artist.rich_text[0].plain_text}-${result.properties.Name.title[0].plain_text}`
      ),
      tracklist: tracklist ? tracklist.plain_text : "",
      description: description ? description.plain_text : "",
    };
    return album;
  });

  const sortedAlbums = albums.sort(function (a: Album, b: Album) {
    if (a.artist < b.artist) {
      return -1;
    }
    if (a.artist > b.artist) {
      return 1;
    }
    return 0;
  });

  return sortedAlbums;
}
