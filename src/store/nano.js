import { atom } from 'nanostores';

export const isCommandMenuOpen = atom(false);
export const $bookmarkCategory = atom('all');

export function updateCategory(category) {
    $bookmarkCategory.set(category);
}
