<template>
  <div class="actor-shows-list">
    <NH2 class="actor-shows-list__title">TV Shows</NH2>
    <ul v-if="credits.length" class="actor-shows-list__list">
      <li
        v-for="credit in credits"
        :key="credit._embedded?.show?.id ?? ''"
        class="actor-shows-list__item"
      >
        <RouterLink
          v-if="credit._embedded?.show"
          :to="{ name: ROUTE_NAMES.SHOW, params: { id: credit._embedded.show.id } }"
          class="actor-shows-list__link"
        >
          <img
            v-if="credit._embedded.show.image?.medium"
            class="actor-shows-list__poster"
            :src="credit._embedded.show.image.medium"
            :alt="credit._embedded.show.name"
          />
          <span class="actor-shows-list__name">{{ credit._embedded.show.name }}</span>
          <NText
            v-if="credit._links?.character?.name"
            depth="2"
            class="actor-shows-list__character"
          >
            — {{ credit._links.character.name }}
          </NText>
        </RouterLink>
      </li>
    </ul>
    <NEmpty v-else description="No TV shows data" />
  </div>
</template>

<script setup lang="ts">
import { NH2, NText, NEmpty } from 'naive-ui';
import { ROUTE_NAMES } from '@/app/routes';
import type { PersonCastCredit } from '@/shared/api/types';

defineProps<{
  credits: PersonCastCredit[];
}>();
</script>

<style lang="scss" scoped>
.actor-shows-list {
  &__title {
    margin-top: 24px;
    margin-bottom: 12px;
    font-size: 1.25rem;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__item {
    margin: 0;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition:
      background 0.2s ease,
      box-shadow 0.22s ease;

    &:hover,
    &:focus-visible {
      background: var(--n-color-hover);
      box-shadow:
        0 2px 8px rgba(15, 23, 42, 0.06),
        0 8px 20px rgba(15, 23, 42, 0.08);
    }

    &:focus-visible {
      outline: none;
    }
  }

  &__poster {
    width: 50px;
    height: 70px;
    object-fit: cover;
    border-radius: 4px;
    flex-shrink: 0;
  }

  &__name {
    font-weight: 500;
    flex: 1;
  }

  &__character {
    font-size: 0.9rem;
  }
}
</style>
