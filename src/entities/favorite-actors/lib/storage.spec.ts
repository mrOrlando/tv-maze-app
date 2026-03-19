import { afterEach, describe, expect, it } from 'vitest';
import type { CastPerson } from '@/shared/api/types';
import {
  FAVORITE_ACTORS_STORAGE_KEY,
  readFavoriteActorsFromStorage,
  toStorablePerson,
  writeFavoriteActorsToStorage,
} from './storage';

describe('favorite-actors storage', () => {
  afterEach(() => {
    localStorage.removeItem(FAVORITE_ACTORS_STORAGE_KEY);
  });

  it('toStorablePerson keeps only card fields', () => {
    const full = {
      id: 1,
      name: 'Jane',
      image: { medium: 'm' },
      country: { name: 'US', code: 'US', timezone: 'x' },
      birthday: '1990-01-01',
    } as CastPerson;
    expect(toStorablePerson(full)).toEqual({
      id: 1,
      name: 'Jane',
      image: { medium: 'm' },
      country: { name: 'US', code: 'US', timezone: 'x' },
    });
  });

  it('reads and writes favorites', () => {
    const list: CastPerson[] = [{ id: 2, name: 'Bob', image: null, country: null }];
    writeFavoriteActorsToStorage(list);
    expect(readFavoriteActorsFromStorage()).toEqual(list);
  });
});
