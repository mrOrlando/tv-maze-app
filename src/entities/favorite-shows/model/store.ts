import { defineStore } from 'pinia';
import type { Show } from '@/shared/api/types';
import {
  readFavoriteShowsFromStorage,
  toStorableShow,
  writeFavoriteShowsToStorage,
} from '../lib/storage';

export interface FavoriteShowsState {
  favorites: Show[];
}

export const useFavoriteShowsStore = defineStore('favoriteShows', {
  state: (): FavoriteShowsState => ({
    favorites: readFavoriteShowsFromStorage(),
  }),
  getters: {
    isFavorite:
      (state: FavoriteShowsState) =>
      (id: number): boolean =>
        state.favorites.some(s => s.id === id),
  },
  actions: {
    persist(): void {
      writeFavoriteShowsToStorage(this.favorites);
    },
    toggleFavorite(show: Show): void {
      const id = show.id;
      const index = this.favorites.findIndex(s => s.id === id);
      if (index >= 0) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(toStorableShow(show));
      }
      this.persist();
    },
    removeFavorite(id: number): void {
      const index = this.favorites.findIndex(s => s.id === id);
      if (index >= 0) {
        this.favorites.splice(index, 1);
        this.persist();
      }
    },
  },
});
