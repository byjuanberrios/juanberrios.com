import { persistentAtom } from "@nanostores/persistent";

export const THEME_MAP = {
  light: "light",
  dark: "dark",
} as const;

export type ThemeKey = keyof typeof THEME_MAP;
export type ThemeValue = (typeof THEME_MAP)[ThemeKey];

export const themeStore = persistentAtom<ThemeValue>("theme", THEME_MAP.dark, {
  encode: (value) => value,
  decode: (value) => value as ThemeValue,
});
