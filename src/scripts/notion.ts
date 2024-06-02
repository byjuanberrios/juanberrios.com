import { Client } from "@notionhq/client";

export type Album = {
  artist: string;
  name: string;
  cover: any;
  year?: number;
};

export async function getAlbums(): Promise<Album[]> {
  const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });
  const pages: any = await notion.databases.query({
    database_id: import.meta.env.NOTION_DATABASE_ID,
  });

  const albums = pages.results.map((result: any) => {
    const album = {
      artist: result.properties.Artist.rich_text[0].plain_text,
      name: result.properties.Name.title[0].plain_text,
      cover: result.properties["Cover image"].rich_text[0].plain_text,
      year: result.properties.Year.number,
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
