<template>
  <div class="favorites">
    <NH1>Favorite shows</NH1>
    <NEmpty v-if="!favorites.length" description="You have not added any shows yet.">
      <template #extra>
        <RouterLink :to="{ name: ROUTE_NAMES.HOME }" v-slot="{ navigate }">
          <NButton type="primary" @click="navigate">Browse shows</NButton>
        </RouterLink>
      </template>
    </NEmpty>
    <div v-else class="favorites__grid">
      <Card v-for="show in favorites" :key="show.id" class="favorites__item" :show="show" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NH1, NButton, NEmpty } from 'naive-ui';
import { useFavoriteShowsStore } from '@/entities/favorite-shows';
import { Card } from '@/entities/show';
import { ROUTE_NAMES } from '@/app/routes';

const favoriteStore = useFavoriteShowsStore();
const { favorites } = storeToRefs(favoriteStore);
</script>

<style lang="scss" scoped>
.favorites {
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;

  &__grid {
    display: grid;
    /* Cap column width so a single card does not stretch to full row (avoid 1fr max track) */
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 320px));
    justify-content: start;
    gap: 1.25rem 1.5rem;
    margin-top: 1.5rem;
  }
}
</style>
