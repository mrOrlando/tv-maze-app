<template>
  <div class="show-page-skeleton">
    <div class="skeleton skeleton-text show-page-skeleton__title"></div>
    <NCard class="show-page-skeleton__card">
      <div class="show-page-skeleton__layout">
        <div class="skeleton skeleton-poster"></div>
        <div class="show-page-skeleton__right">
          <div class="skeleton skeleton-text show-page-skeleton__meta"></div>
          <div class="skeleton skeleton-text show-page-skeleton__meta"></div>
          <div class="show-page-skeleton__summary">
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text show-page-skeleton__line-short"></div>
          </div>
        </div>
      </div>
    </NCard>
    <div class="show-page-skeleton__cast">
      <div
        v-for="i in 6"
        :key="i"
        class="skeleton skeleton-cast-card"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui';
</script>

<style lang="scss" scoped>
.show-page-skeleton {
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;

  .skeleton {
    background: linear-gradient(
      90deg,
      #e8e8e8 25%,
      #f0f0f0 50%,
      #e8e8e8 75%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.2s ease-in-out infinite;
    border-radius: 4px;
  }

  :global(.n-card.n-card--dark .skeleton),
  :global(.dark .skeleton) {
    background: linear-gradient(
      90deg,
      #2a2a2a 25%,
      #363636 50%,
      #2a2a2a 75%
    );
  }

  .skeleton-text {
    height: 1em;
  }

  .skeleton-poster {
    flex-shrink: 0;
    width: 250px;
    aspect-ratio: 2 / 3;
  }

  .skeleton-cast-card {
    aspect-ratio: 2 / 3;
    min-height: 280px;
  }

  &__title {
    width: 320px;
    max-width: 80%;
    height: 32px;
    margin-bottom: 16px;
  }

  &__card {
    margin: 16px 0;
  }

  &__layout {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  &__right {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__meta {
    width: 200px;
    height: 24px;
  }

  &__summary {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__line-short {
    width: 70%;
  }

  &__cast {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    margin-top: 24px;
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
