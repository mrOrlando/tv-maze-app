import { createStore } from 'vuex';
import { showStore } from '@/entities/show';
import { notificationStore } from '@/entities/notification';

export default createStore({
  modules: {
    shows: showStore,
    notification: notificationStore,
  },
});
