import type { Module } from 'vuex';
import type { Show } from '@/shared/api/types';
import ShowsService from '../api/shows.service';
import { grabPopularShows } from '../lib/shows.helper';

export interface ShowState {
  items: Show[];
}

const showStore: Module<ShowState, unknown> = {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {
    UPDATE_SHOWS(state, shows: Show[]) {
      state.items = shows;
    },
  },
  actions: {
    async fetchShows({ commit, dispatch }, searchText?: string): Promise<void> {
      try {
        if (searchText) {
          const shows = await ShowsService.getShows(searchText);
          commit('UPDATE_SHOWS', shows);
        } else {
          const { data: fullSchedule } = await ShowsService.getFullSchedule();

          if (fullSchedule) {
            const popularShows = grabPopularShows(fullSchedule);
            commit('UPDATE_SHOWS', popularShows);
          }
        }
      } catch (error) {
        const err = error as Error;
        dispatch(
          'notification/add',
          { type: 'error', message: "Can't load shows: " + err.message },
          { root: true }
        );
      }
    },
    async fetchShow({ commit, dispatch, state }, id: string | number): Promise<Show | undefined> {
      try {
        const show = await ShowsService.getShow(id);

        let shows: Show[];
        if (state.items.length) {
          shows = state.items.map(item => (item.id === show.id ? show : item));
        } else {
          shows = [show];
        }

        commit('UPDATE_SHOWS', shows);
        return show;
      } catch (error) {
        const err = error as Error;
        dispatch(
          'notification/add',
          { type: 'error', message: "Can't load the show data: " + err.message },
          { root: true }
        );
      }
    },
  },
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
};

export default showStore;
