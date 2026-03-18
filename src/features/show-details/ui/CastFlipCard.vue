<template>
  <div class="cast-flip-card">
    <div class="cast-flip-card__inner">
      <div class="cast-flip-card__face cast-flip-card__face--front">
        <NCard class="cast-flip-card__actor-card">
          <NSpace vertical align="center" :size="8">
            <div v-if="cast.character.image?.medium" class="cast-flip-card__photo-wrap">
              <img
                class="cast-flip-card__photo"
                :src="cast.character.image.medium"
                :alt="cast.character.name"
              />
            </div>
            <div v-else class="cast-flip-card__placeholder">
              <NText strong>{{ cast.character.name?.charAt(0) }}</NText>
            </div>
            <NText strong>{{ cast.character.name }}</NText>
            <NText depth="2">in the show</NText>
          </NSpace>
        </NCard>
      </div>
      <div class="cast-flip-card__face cast-flip-card__face--back">
        <NCard class="cast-flip-card__actor-card">
          <NSpace vertical align="center" :size="8">
            <div v-if="cast.person.image?.medium" class="cast-flip-card__photo-wrap">
              <img
                class="cast-flip-card__photo"
                :src="cast.person.image.medium"
                :alt="cast.person.name"
              />
            </div>
            <div v-else class="cast-flip-card__placeholder">
              <NText strong>{{ cast.person.name?.charAt(0) }}</NText>
            </div>
            <NText strong>{{ cast.person.name }}</NText>
            <NText depth="2">in real life</NText>
          </NSpace>
        </NCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NCard, NText, NSpace } from 'naive-ui';
import type { CastEntry } from '@/shared/api/types';

defineProps<{
  cast: CastEntry;
}>();
</script>

<style lang="scss" scoped>
.cast-flip-card {
  perspective: 1000px;
  min-height: 440px;

  &__inner {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 440px;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  &:hover &__inner {
    transform: rotateY(180deg);
  }

  &__face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    &--front {
      z-index: 1;
    }

    &--back {
      transform: rotateY(180deg);
    }
  }

  &__actor-card {
    text-align: center;
    height: 100%;
    box-sizing: border-box;
    overflow: visible;

    :deep(.n-card__content) {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      overflow: visible;
      padding-bottom: 12px;
    }
  }

  &__photo-wrap {
    width: 100%;
    aspect-ratio: 2 / 3;
    overflow: hidden;
    border-radius: 8px;
    background: var(--n-color-embedded);
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__placeholder {
    width: 100%;
    aspect-ratio: 2 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--n-color-embedded);
    border-radius: 8px;
    font-size: 2.5rem;
  }
}
</style>
