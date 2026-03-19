<template>
  <NCard class="actor-main-card">
    <div class="actor-main-card__layout">
      <div v-if="person.image?.medium" class="actor-main-card__photo-wrap">
        <img class="actor-main-card__photo" :src="person.image.medium" :alt="person.name" />
      </div>
      <div v-else class="actor-main-card__placeholder">
        <NText strong>{{ person.name?.charAt(0) }}</NText>
      </div>
      <div class="actor-main-card__details">
        <NDescriptions :column="1" bordered size="small">
          <NDescriptionsItem v-if="person.birthday" label="Birthday">
            {{ formatDate(person.birthday) }}
          </NDescriptionsItem>
          <NDescriptionsItem v-if="person.country?.name" label="Country">
            {{ person.country.name }}
          </NDescriptionsItem>
          <NDescriptionsItem v-if="person.gender" label="Gender">
            {{ person.gender }}
          </NDescriptionsItem>
        </NDescriptions>
      </div>
    </div>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NDescriptions, NDescriptionsItem, NText } from 'naive-ui';
import { formatDate } from '@/shared/lib/date';
import type { CastPerson } from '@/shared/api/types';

defineProps<{
  person: CastPerson;
}>();
</script>

<style lang="scss" scoped>
.actor-main-card {
  margin: 16px 0;

  &__layout {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  &__photo-wrap {
    flex-shrink: 0;
    width: 200px;
  }

  &__photo {
    width: 100%;
    display: block;
    border-radius: 8px;
  }

  &__placeholder {
    flex-shrink: 0;
    width: 200px;
    aspect-ratio: 2 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--n-color-embedded);
    border-radius: 8px;
    font-size: 4rem;
  }

  &__details {
    flex: 1;
    min-width: 0;
  }
}
</style>
