import { useState } from "react";

import { useStore } from "@nanostores/react";
import { $bookmarkCategory, updateCategory } from "../../store/nano";

import { IconEye, IconEyeClosed } from "@tabler/icons-react";

export const BookmarksCategories = ({
  categories,
}: {
  categories: string[];
}) => {
  const selectedCategory = useStore($bookmarkCategory);
  const [open, setOpen] = useState(false);

  return (
    <div className={`categories ${open ? "opened" : "closed"}`}>
      <header onClick={() => setOpen(!open)}>
        <h4>
          <span>Tags</span>
        </h4>
        <div className="open-close">
          {open ? <IconEye /> : <IconEyeClosed />}
        </div>
      </header>
      {open && (
        <div className="items">
          {categories.map((category, i) => (
            <button
              key={i}
              className={`category-button ${
                selectedCategory === category
                  ? "category-selected"
                  : "category-nonselected"
              }`}
              onClick={() => updateCategory(category)}
            >
              <span>{category}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
