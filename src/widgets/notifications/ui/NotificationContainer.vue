<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNotificationStore } from '@/entities/notification';
import { NotificationBar } from '@/entities/notification';

const notificationStore = useNotificationStore();
const notifications = computed(() => notificationStore.notifications);
</script>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  right: 0;
  bottom: 0;
  padding-right: 40px;
}
</style>
