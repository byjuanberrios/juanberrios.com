import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { $bookmarkCategory } from "../../store/nano";
import type { Bookmark } from "../../types/types";

export const BookmarksGrid = ({ bookmarks }: { bookmarks: Bookmark[] }) => {
  const selectedCategory: string = useStore($bookmarkCategory);
  const [filteredBookmarks, setFilteredBookmarks] =
    useState<Bookmark[]>(bookmarks);

  useEffect(() => {
    setFilteredBookmarks(bookmarks);
  }, []);

  useEffect(() => {
    selectedCategory === "all"
      ? setFilteredBookmarks(bookmarks)
      : updateBookmarks();
  }, [selectedCategory]);

  const updateBookmarks = () => {
    const updatedBookmarks = bookmarks.filter((bookmark) =>
      (bookmark.tags as string[]).includes(selectedCategory)
    );
    setFilteredBookmarks(updatedBookmarks);
  };

  return (
    <>
      <div>
        <p className="year">año</p>
        <section className="items">
          {filteredBookmarks.map((bookmark: Bookmark, i: number) => (
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
      </div>
    </>
  );
};
