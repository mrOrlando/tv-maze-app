import ShowsService from '@/services/ShowsService';

export default {
  namespaced: true,
  actions: {
    async fetchShows({ commit, dispatch }, searchText) {
      try {
        const shows = await ShowsService.getShows(searchText);
        commit('UPDATE_SHOWS', shows);
      } catch (error) {
        const notification = {
          type: 'error',
          message: "Can't load shows: " + error.message,
        };

        dispatch('notification/add', notification, { root: true });
      }
    },
    async fetchShow({ commit, dispatch, state }, id) {
      try {
        const show = await ShowsService.getShow(id);

        let shows = [];
        if (state.items.length) {
          shows = state.items.map(item => (item.id === show.id ? show : item));
        } else {
          shows = [show];
        }

        commit('UPDATE_SHOWS', shows);
        return show;
      } catch (error) {
        const notification = {
          type: 'error',
          message: "Can't load the show data: " + error.message,
        };

        dispatch('notification/add', notification, { root: true });
      }
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
    getShow: state => id => {
      return state.items.find(show => show.id == id);
    },
  },
};
