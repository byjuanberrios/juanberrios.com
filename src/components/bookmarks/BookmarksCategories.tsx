// import { useState } from "react";

import { useStore } from "@nanostores/react";
import { $bookmarkCategory, updateCategory } from "../../store/nano";

export const BookmarksCategories = ({
  categories,
}: {
  categories: string[];
}) => {
  const selectedCategory = useStore($bookmarkCategory);

  return (
    <div className="mb-8">
      <div className="inline-flex flex-wrap gap-y-1.5 gap-x-1">
        {categories.map((category, i) => (
          <button
            key={i}
            className={`${
              selectedCategory === category
                ? "bg-stone-900 dark:bg-stone-700 text-white"
                : "bg-stone-200 dark:text-stone-900 hover:bg-stone-300"
            } rounded-full py-1 px-2.5 text-sm cursor-pointer transition ease-in-out duration-300`}
            onClick={() => updateCategory(category)}
          >
            <span>{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
