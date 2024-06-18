import { useStore } from "@nanostores/react";
import { $bookmarkCategory, updateCategory } from "../../store/nano";

export const BookmarksCategories = ({ categories }: { categories: any }) => {
  const selectedCategory = useStore($bookmarkCategory);

  return (
    <div className="categories">
      {categories.map(
        (category: { name: string; color: string; id: string }, i: number) => (
          <button
            key={i}
            className="category-button"
            onClick={() => updateCategory(category.id)}
            style={{
              color:
                selectedCategory === category.id
                  ? "var(--color-black)"
                  : "var(--color-highlight)",
            }}
            // style={{
            //   borderColor: `color-mix(in lch, ${
            //     category.color === "default"
            //       ? "var(--color-lightning)"
            //       : category.color
            //   } 80%, black 20%)`,
            // }}
          >
            <span
              className="dot"
              style={{
                backgroundColor: `color-mix(in lch, ${
                  category.color === "default"
                    ? "var(--color-lightning)"
                    : category.color
                } 80%, black 20%)`,
              }}
            />
            <span>{category.name}</span>
          </button>
        )
      )}
    </div>
  );
};
