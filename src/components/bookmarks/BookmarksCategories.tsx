import { updateCategory } from "../../store/nano";

export const BookmarksCategories = ({ categories }: { categories: any }) => {
  return (
    <div className="categories">
      {categories.map(
        (category: { name: string; color: string }, i: number) => (
          <button
            key={i}
            className="category-button"
            onClick={() => updateCategory(category.name)}
            style={{
              backgroundColor: `color-mix(in lch, ${
                category.color === "default"
                  ? "var(--color-lightning)"
                  : category.color
              } 80%, black 20%)`,
            }}
          >
            {category.name}
          </button>
        )
      )}
    </div>
  );
};
