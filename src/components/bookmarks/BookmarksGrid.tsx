import { Fragment, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { $bookmarkCategory } from "../../store/nano";
import type { BookmarksEntries } from "../../types/notion";

export const BookmarksGrid = ({
  bookmarks,
}: {
  bookmarks: BookmarksEntries[];
}) => {
  const selectedCategory = useStore($bookmarkCategory);
  const [filteredBookmarks, setFilteredBookmarks] = useState(bookmarks);

  useEffect(() => {
    if (selectedCategory != "default") updateBookmarks();
  }, [selectedCategory]);

  const updateBookmarks = () => {
    const newBookmarks = bookmarks.map(([year, bookmarksItems]) => {
      const items = bookmarksItems.filter(
        (item) => item.category.name === selectedCategory
      );
      return [year, items] as BookmarksEntries;
    });
    setFilteredBookmarks(newBookmarks);
  };

  return (
    <>
      {filteredBookmarks.map(([year, bookmarksItems], i) => (
        <Fragment key={i}>
          <p className="year">
            {year} - {selectedCategory}
          </p>
          <section className="items">
            {bookmarksItems.map((bookmark: any, i: number) => (
              <a
                href={bookmark.url}
                target="_blank"
                rel="noreferrer noopener"
                key={i}
              >
                <p>
                  <span
                    className="dot"
                    style={{
                      backgroundColor: `color-mix(in lch, ${
                        bookmark.category.color === "default"
                          ? "var(--color-lightning)"
                          : bookmark.category.color
                      } 80%, black 20%)`,
                    }}
                  />{" "}
                  <span className="name">{bookmark.name}</span>
                </p>
                <hr />
                <span className="date">{bookmark.date}</span>
              </a>
            ))}
          </section>
        </Fragment>
      ))}
    </>
  );
};
