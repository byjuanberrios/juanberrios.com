import { Client } from "@notionhq/client";
import { slugify } from "../utils/slugify";
import type { Album, Bookmark, OrderedBookmarks } from "../types/notion";

const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });

export async function getBookmarks(): Promise<OrderedBookmarks> {
  const pages: any = await notion.databases.query({
    database_id: import.meta.env.NOTION_BOOKMARKS_DATABASE_ID,
  });

  const bookmarks = pages.results.map((result: any) => {
    const bookmark = {
      name: result.properties.Name.title[0].plain_text,
      url: result.properties.URL.url,
      category: {
        name: result.properties.category.select.name,
        color: result.properties.category.select.color,
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
  });

  const categories = pages.results.map((result: any) => {
    return {
      name: result.properties.category.select.name,
      color: result.properties.category.select.color,
    };
  });

  const uniqueCategories = categories.reduce(
    (
      accCategories: { name: string; color: string }[],
      category: { name: string; color: string }
    ) => {
      if (!accCategories.some((item) => item.name === category.name)) {
        accCategories.push(category);
      }

      return accCategories;
    },
    []
  );

  return uniqueCategories;
}

export async function getAlbums(): Promise<Album[]> {
  const pages: any = await notion.databases.query({
    database_id: import.meta.env.NOTION_ALBUMS_DATABASE_ID,
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
