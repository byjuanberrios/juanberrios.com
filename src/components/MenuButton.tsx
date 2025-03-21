// import { useStore } from "@nanostores/react";

export const MenuButton = () => {
  return (
    <button
      className="menu-button cursor-pointer relative"
      onClick={() => console.log("click!")}
    >
      <span className="bg-stone-900 dark:bg-lime-400 text-white dark:text-stone-900 rounded-full py-2 px-3.5 text-sm">
        Menu
      </span>
      {/* <div className="popover">Cmd + K</div> */}
    </button>
  );
};
