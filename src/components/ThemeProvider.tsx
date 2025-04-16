import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { themeStore, THEME_MAP } from "../store/theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useStore(themeStore);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === THEME_MAP.dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
};
