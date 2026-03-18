<template>
  <NLayout>
    <NLayoutHeader bordered class="nav-header">
      <NSpace justify="center" align="center" :size="16">
        <RouterLink :to="homeUrl" v-slot="{ navigate, isActive }">
          <NButton quaternary :type="isActive ? 'primary' : undefined" @click="navigate">
            Home
          </NButton>
        </RouterLink>
        <RouterLink :to="aboutUrl" v-slot="{ navigate, isActive }">
          <NButton quaternary :type="isActive ? 'primary' : undefined" @click="navigate">
            About
          </NButton>
        </RouterLink>
      </NSpace>
    </NLayoutHeader>
    <NLayoutContent content-style="padding: 24px; text-align: center;">
      <NotificationContainer />
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </NLayoutContent>
  </NLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NLayout, NLayoutHeader, NLayoutContent, NButton, NSpace } from 'naive-ui';
import { ROUTE_NAMES } from '@/app/routes';
import { NotificationContainer } from '@/widgets/notifications';

const homeUrl = computed(() => ({ name: ROUTE_NAMES.HOME }));
const aboutUrl = computed(() => ({ name: ROUTE_NAMES.ABOUT }));
</script>

<style lang="scss" scoped>
.nav-header {
  padding: 16px 24px;
  height: auto;
}
</style>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
