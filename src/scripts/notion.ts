import { Client } from "@notionhq/client";
import { slugify } from "../utils/slugify";
import type { Album } from "../types/notion";

const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });

export async function getAlbums(): Promise<Album[]> {
  const pages: any = await notion.databases.query({
    database_id: import.meta.env.NOTION_ALBUMS_DATABASE_ID,
    filter: {
      property: "Artist",
      rich_text: {
        is_not_empty: true,
      },
    },
  });

  const albums = pages.results.map((result: any) => {
    const tracklist = result.properties.Tracklist.rich_text[0];
    const description = result.properties.Description.rich_text[0];
    const spotify = result.properties.Spotify.url;
    const apple_music = result.properties["Apple Music"].url;
    const soundcloud = result.properties.Soundcloud.url;
    const youtube = result.properties.YouTube.url;

    const streamingLinks = {
      ...(spotify && { spotify }),
      ...(apple_music && { apple_music }),
      ...(soundcloud && { soundcloud }),
      ...(youtube && { youtube }),
    };

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
      // Show streamingLinks only if there is a link of any platform
      ...((apple_music || spotify || soundcloud || youtube) && {
        streamingLinks: streamingLinks,
      }),
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
