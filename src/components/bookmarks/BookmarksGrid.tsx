import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { $bookmarkCategory } from "../../store/nano";
import type { Bookmark, OrderedBookmark } from "../../types/types";

export const BookmarksGrid = ({
  bookmarks,
}: {
  bookmarks: OrderedBookmark[];
}) => {
  const selectedCategory: string = useStore($bookmarkCategory);
  const [filteredBookmarks, setFilteredBookmarks] =
    useState<OrderedBookmark[]>(bookmarks);

  useEffect(() => {
    setFilteredBookmarks(bookmarks);
  }, []);

  useEffect(() => {
    selectedCategory === "all"
      ? setFilteredBookmarks(bookmarks)
      : updateBookmarks();
  }, [selectedCategory]);

  const updateBookmarks = () => {
    // convert to entries for mapping and filter bookmarks with `selectedCategory`
    const filteredData = bookmarks
      .map(([year, bookmarks]) => {
        const filteredBookmarks = bookmarks.filter((bookmark: Bookmark) =>
          (bookmark.tags as string[]).includes(selectedCategory)
        );
        // return only the year with bookmarks in there
        return filteredBookmarks.length > 0 ? [year, filteredBookmarks] : null;
      })
      // Filter out the null values from the final array to ensure only non-empty entries are returned.
      .filter((entry) => entry !== null);

    setFilteredBookmarks(filteredData as OrderedBookmark[]);
  };

  return (
    <>
      <div>
        {filteredBookmarks
          .sort((a, b) => (a < b ? 1 : -1))
          .map(([year, items]) => (
            <>
              <p className="year">{year}</p>
              <section className="items">
                {items.map((bookmark: Bookmark, i: number) => (
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    key={i}
                  >
                    <p>
                      <img
                        src={bookmark.favicon}
                        alt="fav"
                        style={{ borderRadius: "100%" }}
                      />
                      <span className="name">{bookmark.title}</span>
                    </p>
                  </a>
                ))}
              </section>
            </>
          ))}
      </div>
    </>
  );
};
