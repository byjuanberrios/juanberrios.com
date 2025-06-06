import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { $bookmarkCategory } from "../../store/nano";
import type { Bookmark, OrderedBookmark } from "../../types/types";

export const LinksGrid = ({ bookmarks }: { bookmarks: OrderedBookmark[] }) => {
  const selectedCategory: string = useStore($bookmarkCategory);
  const [filteredBookmarks, setFilteredBookmarks] =
    useState<OrderedBookmark[]>(bookmarks);

  useEffect(() => {
    setFilteredBookmarks(bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    selectedCategory === "all"
      ? setFilteredBookmarks(bookmarks)
      : updateBookmarks();
  }, [selectedCategory]);

  const updateBookmarks = () => {
    const filteredData = bookmarks
      .map(([year, bookmarks]) => {
        const filteredBookmarks = bookmarks.filter((bookmark: Bookmark) =>
          (bookmark.tags as string[]).includes(selectedCategory)
        );
        return filteredBookmarks.length > 0 ? [year, filteredBookmarks] : null;
      })
      .filter((entry) => entry !== null);

    setFilteredBookmarks(filteredData as OrderedBookmark[]);
  };

  if (!filteredBookmarks) return <div></div>;

  return (
    <>
      <div>
        {filteredBookmarks
          .sort((a, b) => (a < b ? 1 : -1))
          .map(([year, items]) => (
            <div key={year} className="mb-6">
              <p className="text-stone-400 mb-3">{year}</p>
              <section className="grid gap-1">
                {items.map((bookmark: Bookmark, i: number) => (
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    key={i}
                    className="no-decoration hover:opacity-65"
                  >
                    <p className="inline-flex items-start gap-2 m-0">
                      <img
                        src={bookmark.favicon}
                        alt="fav"
                        className="rounded-full w-4 h-4 mt-0.5"
                      />
                      <span className="name">{bookmark.title}</span>
                    </p>
                  </a>
                ))}
              </section>
            </div>
          ))}
      </div>
    </>
  );
};
