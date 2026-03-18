<template>
  <div class="search-result">
    <SearchBox @change-search-box="handleSearch"></SearchBox>
    <div class="search-result__content">
      <Card v-for="show in shows" :key="show.id" class="search-result__item" :show="show"></Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useShowStore } from '@/entities/show';
import { SearchBox } from '@/features/search';
import { Card } from '@/entities/show';

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
  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 4%;
  }
}
</style>
