import { useStore } from "@nanostores/react";
import { $bookmarkCategory, updateCategory } from "../../store/nano";

export const BookmarksCategories = ({
  categories,
}: {
  categories: string[];
}) => {
  const selectedCategory = useStore($bookmarkCategory);

  return (
    <div className="categories">
      {categories.map((category, i) => (
        <button
          key={i}
          className="category-button"
          onClick={() => updateCategory(category)}
          style={{
            color:
              selectedCategory === category
                ? "var(--color-black)"
                : "var(--color-highlight)",
          }}
        >
          <span
            className="dot"
            // style={{
            //   backgroundColor: `color-mix(in lch, ${
            //     category.color === "default"
            //       ? "var(--color-lightning)"
            //       : category.color
            //   } 80%, black 20%)`,
            // }}
          />
          <span>{category}</span>
        </button>
      ))}
    </div>
  );
};
