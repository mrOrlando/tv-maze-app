import { defineStore } from 'pinia';
import type { CastPerson } from '@/shared/api/types';
import {
  readFavoriteActorsFromStorage,
  toStorablePerson,
  writeFavoriteActorsToStorage,
} from '../lib/storage';

export interface FavoriteActorsState {
  favorites: CastPerson[];
}

export const useFavoriteActorsStore = defineStore('favoriteActors', {
  state: (): FavoriteActorsState => ({
    favorites: readFavoriteActorsFromStorage(),
  }),
  getters: {
    isFavorite:
      (state: FavoriteActorsState) =>
      (id: number): boolean =>
        state.favorites.some(p => p.id === id),
  },
  actions: {
    persist(): void {
      writeFavoriteActorsToStorage(this.favorites);
    },
    toggleFavorite(person: CastPerson): void {
      const id = person.id;
      const index = this.favorites.findIndex(p => p.id === id);
      if (index >= 0) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(toStorablePerson(person));
      }
      this.persist();
    },
    removeFavorite(id: number): void {
      const index = this.favorites.findIndex(p => p.id === id);
      if (index >= 0) {
        this.favorites.splice(index, 1);
        this.persist();
      }
    },
  },
});
