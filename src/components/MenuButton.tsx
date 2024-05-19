import { useStore } from "@nanostores/react";
import { isCommandMenuOpen } from "../store/nano";

export const MenuButton = () => {
  const $isCommandMenuOpen = useStore(isCommandMenuOpen);

  return (
    <button
      className="menu-button"
      onClick={() => isCommandMenuOpen.set(!$isCommandMenuOpen)}
    >
      <span>Menu</span>
    </button>
  );
};
