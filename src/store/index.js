import Vue from 'vue';
import Vuex from 'vuex';
import shows from '@/store/modules/shows';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shows,
  },
});
