import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { themeStore, THEME_MAP } from "../store/theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useStore(themeStore);

  useEffect(() => {
    const root = window.document.documentElement;

    // Solo aplicar el tema del sistema si es la primera carga
    if (!localStorage.getItem("theme")) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? THEME_MAP.dark
        : THEME_MAP.light;
      themeStore.set(systemTheme);
    }

    root.classList.remove(THEME_MAP.light, THEME_MAP.dark);
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
};
