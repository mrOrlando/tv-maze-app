<template>
  <!-- position=absolute: fill #app so the single inner scroll container matches the viewport -->
  <NLayout position="absolute">
    <NLayoutHeader bordered class="nav-header">
      <NSpace justify="center" align="center" :size="16">
        <RouterLink v-slot="{ navigate, isActive }" :to="homeUrl">
          <NButton quaternary :type="isActive ? 'primary' : undefined" @click="navigate">
            Home
          </NButton>
        </RouterLink>
        <RouterLink v-slot="{ navigate, isActive }" :to="favoritesUrl">
          <NButton quaternary :type="isActive ? 'primary' : undefined" @click="navigate">
            Favorites
          </NButton>
        </RouterLink>
      </NSpace>
    </NLayoutHeader>
    <!-- Plain wrapper: NLayoutContent adds a nested .n-layout-scroll-container and causes double scrollbars -->
    <div class="app-main">
      <NotificationContainer />
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </NLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NLayout, NLayoutHeader, NButton, NSpace } from 'naive-ui';
import { ROUTE_NAMES } from '@/app/routes';
import { NotificationContainer } from '@/widgets/notifications';

const homeUrl = computed(() => ({ name: ROUTE_NAMES.HOME }));
const favoritesUrl = computed(() => ({ name: ROUTE_NAMES.FAVORITES }));
</script>

<style lang="scss" scoped>
.nav-header {
  padding: 16px 24px;
  height: auto;
}
</style>

<style lang="scss">
.app-main {
  padding: 24px;
  text-align: center;
}

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
