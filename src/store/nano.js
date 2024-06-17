import { atom } from 'nanostores';

export const isCommandMenuOpen = atom(false);
export const $bookmarkCategory = atom('default');

export function updateCategory(category) {
    $bookmarkCategory.set(category);
}
