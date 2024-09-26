import type { LinkdingBookmark, OrderedBookmark } from "../types/types";

const fetchLinkding = await fetch(
  "https://bookmarks.juanberrios.com/api/bookmarks/shared",
  {
    headers: {
      Authorization: `Token ${import.meta.env.LINKDING_TOKEN}`,
    },
  }
);
const res = await fetchLinkding.json().then((data) => data);

export async function getLinkdingBookmarks(): Promise<OrderedBookmark[]> {
  const resultsByYear = res.results.reduce(
    (acc: any, bookmark: LinkdingBookmark) => {
      const favicon = `https://www.google.com/s2/favicons?domain=${bookmark.url}`;
      const processedBookmark = {
        title: bookmark.title,
        description: bookmark.description,
        url: bookmark.url,
        tags: bookmark.tag_names,
        date: bookmark.date_added,
        favicon,
      };

      const year = processedBookmark.date.substring(0, 4);
      // To remember: Initialize the array if there's not year with it
      if (!acc[year]) {
        acc[year] = [];
      }

      // To remember: push to the "year" the data
      acc[year].push(processedBookmark);
      return acc;
    },
    {}
  );

  return Object.entries(resultsByYear);
}

export async function getLinkdingCategories(): Promise<string[]> {
  if (res.count < 1) {
    return [];
  }

  const allCategories: string[] = res.results
    .map((bookmark: LinkdingBookmark) => {
      return bookmark.tag_names;
    })
    .flat();

  // To remember: This replace a reduce
  const uniqueCategories = ["all", ...new Set(allCategories)];

  return uniqueCategories;
}
