import type { Bookmark, LinkdingBookmark } from "../types/types";

const fetchLinkding = await fetch(
  "https://juanberrios-bm.fly.dev/api/bookmarks/shared",
  {
    headers: {
      Authorization: `Token ${import.meta.env.LINKDING_TOKEN}`,
    },
  }
);
const res = await fetchLinkding.json().then((data) => data);

export async function getLinkdingBookmarks(): Promise<{ string: Bookmark[] }> {
  const resultsByMonth: { string: Bookmark[] } = res.results.reduce(
    (acc: any, bookmark: LinkdingBookmark) => {
      const favicon = `https://www.google.com/s2/favicons?domain=${bookmark.url}`;

      // Get the month of the bookmark in Spanish
      const month = new Date(bookmark.date_added).toLocaleDateString("es-ES", {
        month: "long",
      });
      const year = bookmark.date_added.substring(0, 4);

      const header_date = `${month} ${year}`;

      const processedBookmark = {
        title: bookmark.website_title,
        description: bookmark.website_description,
        url: bookmark.url,
        tags: bookmark.tag_names,
        date: bookmark.date_added,
        favicon,
      };

      // To remember: Initialize the array if there's not date with it
      if (!acc[header_date]) {
        acc[header_date] = [];
      }

      // To remember: push to the "date" the data
      acc[header_date].push(processedBookmark);
      return acc;
    },
    {}
  );

  return resultsByMonth;
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
