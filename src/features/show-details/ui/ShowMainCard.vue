<template>
  <NCard class="show-main-card">
    <div class="show-main-card__layout">
      <img
        v-if="show.image?.medium"
        class="show-main-card__poster"
        :src="show.image.medium"
        :alt="show.name"
      />
      <div class="show-main-card__right">
        <NDescriptions :column="1" bordered size="small">
          <NDescriptionsItem label="Premiered">
            {{ formatDate(show.premiered) }}
          </NDescriptionsItem>
          <NDescriptionsItem v-if="show.rating?.average" label="Rating">
            <NTag :type="ratingTagType(show.rating.average)">
              {{ formatRate(show.rating.average) }}
            </NTag>
          </NDescriptionsItem>
        </NDescriptions>
        <!-- TVMaze returns HTML summary from the API -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-if="show.summary" class="show-main-card__summary" v-html="show.summary"></div>
      </div>
    </div>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NDescriptions, NDescriptionsItem, NTag } from 'naive-ui';
import { formatDate as formatDateHelper } from '@/shared/lib/date';
import type { Show } from '@/shared/api/types';

defineProps<{
  show: Show;
}>();

function formatDate(value: string | undefined | null) {
  return formatDateHelper(value);
}

function formatRate(rating: number) {
  if (rating > 7) return `${rating} 👍`;
  if (rating < 5) return `${rating} 👎`;
  return String(rating);
}

function ratingTagType(rating: number): 'success' | 'warning' | 'error' | 'default' {
  if (rating > 7) return 'success';
  if (rating < 5) return 'error';
  return 'warning';
}
</script>

<style lang="scss" scoped>
.show-main-card {
  margin: 16px 0;

  &__layout {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  &__poster {
    flex-shrink: 0;
    max-width: 250px;
    width: 100%;
    display: block;
  }

  &__right {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__summary {
    :deep(p:last-child) {
      margin-bottom: 0;
    }
  }
}
</style>
