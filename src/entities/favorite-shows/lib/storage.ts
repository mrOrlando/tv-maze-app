import type { Show } from '@/shared/api/types';

export const FAVORITE_SHOWS_STORAGE_KEY = 'tv-maze-app-favorite-shows';

/** Keep payload small (no embedded cast, etc.) */
export function toStorableShow(show: Show): Show {
  return {
    id: show.id,
    name: show.name,
    image: show.image ?? null,
    summary: show.summary ?? null,
  };
}

export function readFavoriteShowsFromStorage(): Show[] {
  if (typeof localStorage === 'undefined') {
    return [];
  }
  try {
    const raw = localStorage.getItem(FAVORITE_SHOWS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (item): item is Show =>
        item !== null &&
        typeof item === 'object' &&
        typeof (item as Show).id === 'number' &&
        typeof (item as Show).name === 'string'
    );
  } catch {
    return [];
  }
}

export function writeFavoriteShowsToStorage(shows: Show[]): void {
  if (typeof localStorage === 'undefined') {
    return;
  }
  localStorage.setItem(FAVORITE_SHOWS_STORAGE_KEY, JSON.stringify(shows));
}
