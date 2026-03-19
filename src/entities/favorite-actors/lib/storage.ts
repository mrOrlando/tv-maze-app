import type { CastPerson } from '@/shared/api/types';

export const FAVORITE_ACTORS_STORAGE_KEY = 'tv-maze-app-favorite-actors';

export function toStorablePerson(person: CastPerson): CastPerson {
  return {
    id: person.id,
    name: person.name,
    image: person.image ?? null,
    country: person.country ?? null,
  };
}

export function readFavoriteActorsFromStorage(): CastPerson[] {
  if (typeof localStorage === 'undefined') {
    return [];
  }
  try {
    const raw = localStorage.getItem(FAVORITE_ACTORS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (item): item is CastPerson =>
        item !== null &&
        typeof item === 'object' &&
        typeof (item as CastPerson).id === 'number' &&
        typeof (item as CastPerson).name === 'string',
    );
  } catch {
    return [];
  }
}

export function writeFavoriteActorsToStorage(people: CastPerson[]): void {
  if (typeof localStorage === 'undefined') {
    return;
  }
  localStorage.setItem(FAVORITE_ACTORS_STORAGE_KEY, JSON.stringify(people));
}
