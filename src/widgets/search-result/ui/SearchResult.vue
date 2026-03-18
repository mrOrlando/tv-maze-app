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
import { useStore } from 'vuex';
import { SearchBox } from '@/features/search';
import { Card } from '@/entities/show';

const store = useStore();
const shows = computed(() => store.getters['shows/shows']);

async function handleSearch(searchText: string) {
  await store.dispatch('shows/fetchShows', searchText);
}

onMounted(() => {
  store.dispatch('shows/fetchShows');
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
