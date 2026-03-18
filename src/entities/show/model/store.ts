import { defineStore } from 'pinia';
import type { Show } from '@/shared/api/types';
import ShowsService from '../api/shows.service';
import { grabPopularShows } from '../lib/shows.helper';
import { useNotificationStore } from '@/entities/notification/model/store';

export interface ShowState {
  items: Show[];
  loading: boolean;
  detailLoading: boolean;
}

export const useShowStore = defineStore('shows', {
  state: (): ShowState => ({
    items: [],
    loading: false,
    detailLoading: false,
  }),
  getters: {
    shows(state: ShowState): Show[] {
      return state.items;
    },
    getShow:
      (state: ShowState) =>
      (id: string | number): Show | undefined => {
        return state.items.find(show => show.id === Number(id));
      },
  },
  actions: {
    async fetchShows(searchText?: string): Promise<void> {
      this.loading = true;
      try {
        if (searchText) {
          const shows = await ShowsService.getShows(searchText);
          this.items = shows;
        } else {
          const { data: fullSchedule } = await ShowsService.getFullSchedule();

          if (fullSchedule) {
            const popularShows = grabPopularShows(fullSchedule);
            this.items = popularShows;
          }
        }
      } catch (error) {
        const err = error as Error;
        useNotificationStore().add({
          type: 'error',
          message: "Can't load shows: " + err.message,
        });
      } finally {
        this.loading = false;
      }
    },
    async fetchShow(id: string | number): Promise<Show | undefined> {
      this.detailLoading = true;
      try {
        const show = await ShowsService.getShow(id);

        let shows: Show[];
        if (this.items.length) {
          shows = this.items.map(item => (item.id === show.id ? show : item));
        } else {
          shows = [show];
        }

        this.items = shows;
        return show;
      } catch (error) {
        const err = error as Error;
        useNotificationStore().add({
          type: 'error',
          message: "Can't load the show data: " + err.message,
        });
      } finally {
        this.detailLoading = false;
      }
    },
  },
});
