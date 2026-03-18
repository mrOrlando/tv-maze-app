<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useNotificationStore } from '@/entities/notification';
import type { NotificationItem } from '../model/store';

const props = defineProps<{
  notification: NotificationItem;
}>();

const notificationStore = useNotificationStore();
const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

const notificationTypeClass = computed(() => `-text-${props.notification.type}`);

function remove(notification: NotificationItem) {
  notificationStore.remove(notification);
}

onMounted(() => {
  timeout.value = setTimeout(() => remove(props.notification), 5000);
});

onBeforeUnmount(() => {
  if (timeout.value) clearTimeout(timeout.value);
});
</script>

<style lang="scss" scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
