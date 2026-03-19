<template>
  <div class="card-skeleton">
    <NCard>
      <template #header>
        <div class="skeleton skeleton-text card-skeleton__title"></div>
      </template>
      <div class="skeleton skeleton-rect card-skeleton__image"></div>
      <div class="card-skeleton__lines">
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text card-skeleton__line-short"></div>
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui';
</script>

<style lang="scss" scoped>
.card-skeleton {
  .skeleton {
    background: linear-gradient(90deg, #e8e8e8 25%, #f0f0f0 50%, #e8e8e8 75%);
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.2s ease-in-out infinite;
    border-radius: 4px;
  }

  :global(.n-card.n-card--dark .skeleton),
  :global(.dark .skeleton) {
    background: linear-gradient(90deg, #2a2a2a 25%, #363636 50%, #2a2a2a 75%);
  }

  .skeleton-text {
    height: 1em;
  }

  .skeleton-rect {
    aspect-ratio: 2 / 3;
  }

  &__title {
    width: 80%;
    max-width: 180px;
  }

  &__image {
    width: 100%;
    margin-bottom: 8px;
  }

  &__lines {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__line-short {
    width: 60%;
  }
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
