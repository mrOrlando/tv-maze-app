<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { NotificationBar } from '@/entities/notification';

const store = useStore();
const notifications = computed(() => store.state.notification.notifications);
</script>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  right: 0;
  bottom: 0;
  padding-right: 40px;
}
</style>
