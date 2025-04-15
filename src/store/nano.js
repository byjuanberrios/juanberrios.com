import { atom } from 'nanostores';
// import { persistentAtom } from '@nanostores/persistent';

export const $bookmarkCategory = atom('all');

export function updateCategory(category) {
    $bookmarkCategory.set(category);
}

// export const $theme = persistentAtom('theme', 'dark');

// export function updateTheme(theme) {
//     $theme.set(theme);
// }