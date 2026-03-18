<template>
  <NAlert
    :type="(notification.type as 'success' | 'info' | 'warning' | 'error')"
    closable
    @close="remove(notification)"
  >
    {{ notification.message }}
  </NAlert>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { NAlert } from 'naive-ui';
import { useNotificationStore } from '@/entities/notification';
import type { NotificationItem } from '../model/store';

const props = defineProps<{
  notification: NotificationItem;
}>();

const notificationStore = useNotificationStore();
const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

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
