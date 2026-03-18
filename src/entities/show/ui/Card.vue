<template>
  <router-link :to="urlOfShow" class="card">
    <NCard>
      <template #header>
        <span data-test="card-title">{{ show.name }}</span>
      </template>
      <img v-if="avatar" class="card__image" :src="avatar" :alt="show.name" />
      <p v-if="show.summary" v-html="show.summary"></p>
    </NCard>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NCard } from 'naive-ui';
import { ROUTE_NAMES } from '@/app/routes';
import type { Show } from '@/shared/api/types';

const props = defineProps<{
  show: Show;
}>();

const urlOfShow = computed(() => ({
  name: ROUTE_NAMES.SHOW,
  params: { id: props.show.id },
}));

const avatar = computed(() => props.show.image?.medium);
</script>

<style lang="scss" scoped>
.card {
  text-decoration: none;
  display: block;

  :deep(.n-card-header__main) {
    font-weight: 600;
  }
}

.card__image {
  width: 100%;
  display: block;
  margin-bottom: 8px;
}
</style>
