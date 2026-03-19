import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Show } from '@/shared/api/types';
import {
  FAVORITE_SHOWS_STORAGE_KEY,
  readFavoriteShowsFromStorage,
  toStorableShow,
  writeFavoriteShowsToStorage,
} from './storage';

describe('favorite-shows storage', () => {
  afterEach(() => {
    localStorage.removeItem(FAVORITE_SHOWS_STORAGE_KEY);
    vi.unstubAllGlobals();
  });

  it('toStorableShow strips embedded data', () => {
    const full = {
      id: 1,
      name: 'Test',
      summary: '<p>x</p>',
      image: { medium: 'm' },
      _embedded: { cast: [] },
    } as Show;
    expect(toStorableShow(full)).toEqual({
      id: 1,
      name: 'Test',
      summary: '<p>x</p>',
      image: { medium: 'm' },
    });
  });

  it('reads and writes favorites', () => {
    const list: Show[] = [{ id: 2, name: 'A', image: null, summary: null }];
    writeFavoriteShowsToStorage(list);
    expect(readFavoriteShowsFromStorage()).toEqual(list);
  });
});
