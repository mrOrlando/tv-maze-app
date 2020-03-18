import ShowsService from '@/services/ShowsService';

export default {
  actions: {
    async fetchShows({ commit }, searchText) {
      const shows = await ShowsService.getShows(searchText);
      commit('UPDATE_SHOWS', shows);
    },
  },
  mutations: {
    UPDATE_SHOWS(state, shows) {
      state.items = shows;
    },
  },
  state: {
    items: [],
  },
  getters: {
    shows(state) {
      return state.items;
    },
  },
};
