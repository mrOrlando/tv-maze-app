<template>
  <div class="notification-container">
    <NSpace vertical :size="12">
      <NotificationBar
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </NSpace>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NSpace } from 'naive-ui';
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
  padding: 24px;
  z-index: 1000;
}
</style>
