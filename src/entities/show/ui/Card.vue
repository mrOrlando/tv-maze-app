<template>
  <router-link :to="urlOfShow" class="card">
    <NCard>
      <template #header>
        <span data-test="card-title">{{ show.name }}</span>
      </template>
      <img v-if="avatar" class="card__image" :src="avatar" :alt="show.name" />
      <p v-if="summaryText" class="card__summary" :title="summaryText">{{ summaryText }}</p>
    </NCard>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NCard } from 'naive-ui';
import { ROUTE_NAMES } from '@/app/routes';
import type { Show } from '@/shared/api/types';
import { htmlToPlainText } from '@/shared/lib/html/htmlToPlainText';

const props = defineProps<{
  show: Show;
}>();

const urlOfShow = computed(() => ({
  name: ROUTE_NAMES.SHOW,
  params: { id: props.show.id },
}));

const avatar = computed(() => props.show.image?.medium);

const summaryText = computed(() =>
  props.show.summary ? htmlToPlainText(props.show.summary) : '',
);
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

/* Fixed preview height: same number of lines on every card (line-clamp + min-height) */
.card__summary {
  margin: 0;
  text-align: left;
  line-height: 1.45;
  min-height: calc(1em * 1.45 * 6);
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  line-clamp: 6;
}
</style>
