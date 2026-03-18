import type { Module } from 'vuex';

export interface NotificationItem {
  id: number;
  type: string;
  message: string;
}

export interface NotificationState {
  notifications: NotificationItem[];
}

let nextId = 1;

const notificationStore: Module<NotificationState, unknown> = {
  namespaced: true,
  state: {
    notifications: [],
  },
  mutations: {
    PUSH(state, notification: Omit<NotificationItem, 'id'>) {
      state.notifications.push({ ...notification, id: nextId++ });
    },
    DELETE(state, notificationToRemove: NotificationItem) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationToRemove.id
      );
    },
  },
  actions: {
    add({ commit }, notification: Omit<NotificationItem, 'id'>) {
      commit('PUSH', notification);
    },
    remove({ commit }, notificationToRemove: NotificationItem) {
      commit('DELETE', notificationToRemove);
    },
  },
};

export default notificationStore;
