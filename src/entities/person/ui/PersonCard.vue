<template>
  <router-link :to="urlOfActor" class="person-card">
    <NCard>
      <template #header>
        <span data-test="person-card-title">{{ person.name }}</span>
      </template>
      <img
        v-if="person.image?.medium"
        class="person-card__image"
        :src="person.image.medium"
        :alt="person.name"
      />
      <div v-else class="person-card__placeholder">
        {{ person.name?.charAt(0) || '?' }}
      </div>
      <p v-if="subtitle" class="person-card__meta">{{ subtitle }}</p>
    </NCard>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NCard } from 'naive-ui';
import { ROUTE_NAMES } from '@/app/routes';
import type { CastPerson } from '@/shared/api/types';

const props = defineProps<{
  person: CastPerson;
}>();

const urlOfActor = computed(() => ({
  name: ROUTE_NAMES.ACTOR,
  params: { id: props.person.id },
}));

const subtitle = computed(() => props.person.country?.name ?? '');
</script>

<style lang="scss" scoped>
.person-card {
  text-decoration: none;
  display: block;

  :deep(.n-card-header__main) {
    font-weight: 600;
  }
}

.person-card__image {
  width: 100%;
  display: block;
  margin-bottom: 8px;
  border-radius: 4px;
}

.person-card__placeholder {
  width: 100%;
  aspect-ratio: 2 / 3;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--n-color-embedded);
  border-radius: 4px;
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--n-text-color-3);
}

.person-card__meta {
  margin: 0;
  text-align: left;
  line-height: 1.45;
  min-height: calc(1em * 1.45 * 2);
  color: var(--n-text-color-2);
  font-size: 0.9em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  word-break: break-word;
}
</style>
