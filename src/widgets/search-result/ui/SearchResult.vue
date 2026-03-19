<template>
  <div class="search-result">
    <SearchBox @change-search-box="handleSearch"></SearchBox>
    <div class="search-result__content">
      <template v-if="showStore.loading">
        <CardSkeleton
          v-for="i in skeletonCount"
          :key="'skeleton-' + i"
          class="search-result__item"
        />
      </template>
      <Card v-else v-for="show in shows" :key="show.id" class="search-result__item" :show="show"></Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useShowStore } from '@/entities/show';
import { SearchBox } from '@/features/search';
import { Card, CardSkeleton } from '@/entities/show';

const skeletonCount = 8;
const showStore = useShowStore();
const shows = computed(() => showStore.shows);

async function handleSearch(searchText: string) {
  await showStore.fetchShows(searchText);
}

onMounted(() => {
  showStore.fetchShows();
});
</script>

<style lang="scss">
.search-result {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 320px));
    justify-content: start;
    gap: 1.25rem 1.5rem;
  }
}
</style>
