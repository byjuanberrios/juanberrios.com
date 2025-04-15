import { useStore } from "@nanostores/react";
import { THEME_MAP, themeStore } from "../store/theme";
import { TbMoon, TbSun } from "react-icons/tb";

export const ToggleTheme = () => {
  const theme = useStore(themeStore);

  const handleClick = () => {
    themeStore.set(theme === THEME_MAP.dark ? THEME_MAP.light : THEME_MAP.dark);
  };

  return (
    <button
      className="text-base cursor-pointer"
      onClick={handleClick}
      aria-label="Cambiar tema"
    >
      {theme === THEME_MAP.dark ? <TbSun /> : <TbMoon />}
    </button>
  );
};
