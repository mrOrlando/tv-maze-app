<template>
  <div class="actor-page-skeleton">
    <div class="skeleton skeleton-text actor-page-skeleton__title"></div>
    <NCard class="actor-page-skeleton__card">
      <div class="actor-page-skeleton__layout">
        <div class="skeleton skeleton-photo"></div>
        <div class="actor-page-skeleton__details">
          <div class="skeleton skeleton-text actor-page-skeleton__meta"></div>
          <div class="skeleton skeleton-text actor-page-skeleton__meta"></div>
          <div class="skeleton skeleton-text actor-page-skeleton__meta"></div>
        </div>
      </div>
    </NCard>
    <div class="skeleton skeleton-text actor-page-skeleton__shows-title"></div>
    <div class="actor-page-skeleton__list">
      <div
        v-for="i in 5"
        :key="i"
        class="actor-page-skeleton__list-item"
      >
        <div class="skeleton skeleton-poster"></div>
        <div class="skeleton skeleton-text actor-page-skeleton__list-name"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui';
</script>

<style lang="scss" scoped>
.actor-page-skeleton {
  max-width: 800px;
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

  .skeleton-photo {
    flex-shrink: 0;
    width: 200px;
    aspect-ratio: 2 / 3;
  }

  .skeleton-poster {
    width: 50px;
    height: 70px;
    flex-shrink: 0;
  }

  &__title {
    width: 240px;
    max-width: 60%;
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

  &__details {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__meta {
    width: 160px;
    height: 24px;
  }

  &__shows-title {
    width: 120px;
    height: 24px;
    margin-top: 24px;
    margin-bottom: 12px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
  }

  &__list-name {
    flex: 1;
    height: 20px;
    max-width: 200px;
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
