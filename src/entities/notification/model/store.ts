import { defineStore } from 'pinia';

export interface NotificationItem {
  id: number;
  type: string;
  message: string;
}

let nextId = 1;

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as NotificationItem[],
  }),
  actions: {
    add(notification: Omit<NotificationItem, 'id'>) {
      this.notifications.push({ ...notification, id: nextId++ });
    },
    remove(notificationToRemove: NotificationItem) {
      this.notifications = this.notifications.filter(
        notification => notification.id !== notificationToRemove.id
      );
    },
  },
});
