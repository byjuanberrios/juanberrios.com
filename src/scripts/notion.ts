import { Client } from "@notionhq/client";
import { slugify } from "../utils/slugify";
import type { Album, Bookmark, OrderedBookmarks } from "../types/notion";

const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });

export async function getBookmarks(): Promise<OrderedBookmarks> {
  const pages: any = await notion.databases.query({
    database_id: import.meta.env.NOTION_BOOKMARKS_DATABASE_ID,
    filter: {
      property: "Name",
      rich_text: {
        is_not_empty: true,
      },
    },
  });

  const bookmarks = pages.results.map((result: any) => {
    const bookmark = {
      name: result.properties.Name.title[0].plain_text,
      url: result.properties.URL.url,
      category: {
        name: result.properties.category.select.name,
        color: result.properties.category.select.color,
        id: slugify(result.properties.category.select.name),
      },
      date: result.created_time,
    };
    return bookmark;
  });

  const orderedBookmarks = bookmarks.reduce(
    (ordered: OrderedBookmarks, bookmark: Bookmark) => {
      const year = bookmark.date.substring(0, 4);
      if (!ordered[year]) {
        ordered[year] = [];
      }
      const data = {
        name: bookmark.name,
        url: bookmark.url,
        category: bookmark.category,
        date: bookmark.date.substring(5, 10),
      };

      ordered[year].push(data);

      return ordered;
    },
    {}
  );

  return orderedBookmarks;
}

export async function getBookmarksCategories() {
  const pages: any = await notion.databases.query({
    database_id: import.meta.env.NOTION_BOOKMARKS_DATABASE_ID,
    filter: {
      property: "category",
      select: {
        is_not_empty: true,
      },
    },
  });

  const categories = pages.results.map((result: any) => {
    return {
      name: result.properties.category.select.name,
      color: result.properties.category.select.color,
      id: slugify(result.properties.category.select.name),
    };
  });

  const uniqueCategories = categories.reduce(
    (
      accCategories: { name: string; color: string; id: string }[],
      category: { name: string; color: string; id: string }
    ) => {
      if (!accCategories.some((item) => item.id === category.id)) {
        accCategories.push(category);
      }

      return accCategories;
    },
    []
  );

  const defaultCategory = {
    name: "todo",
    color: "black",
    id: "all",
  };

  return [defaultCategory, ...uniqueCategories];
}

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

    const streamingLinks = {
      ...(spotify && { spotify }),
      ...(apple_music && { apple_music }),
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
      ...((apple_music || spotify) && { streamingLinks: streamingLinks }),
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
