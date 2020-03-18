import Vue from 'vue';
import Vuex from 'vuex';
import shows from '@/store/modules/shows';
import * as notification from '@/store/modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shows,
    notification,
  },
});
