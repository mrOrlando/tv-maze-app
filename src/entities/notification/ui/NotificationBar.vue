<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  notification: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const timeout = ref(null);

const notificationTypeClass = computed(() => `-text-${props.notification.type}`);

function remove(notification) {
  store.dispatch('notification/remove', notification);
}

onMounted(() => {
  timeout.value = setTimeout(() => remove(props.notification), 5000);
});

onBeforeUnmount(() => {
  clearTimeout(timeout.value);
});
</script>

<style lang="scss" scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
