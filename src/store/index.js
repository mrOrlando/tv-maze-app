import { createStore } from 'vuex';
import shows from '@/store/modules/shows';
import * as notification from '@/store/modules/notification';

export default createStore({
  modules: {
    shows,
    notification,
  },
});
