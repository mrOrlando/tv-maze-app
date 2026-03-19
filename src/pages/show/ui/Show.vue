<template>
  <div class="tv-show">
    <ShowPageSkeleton v-if="showStore.detailLoading && !show.name" />
    <template v-else>
      <div v-if="show.name" class="tv-show__heading">
        <NH1 class="tv-show__title">{{ show.name }}</NH1>
        <NButton
          v-if="show.id"
          :type="isFavorite ? 'primary' : 'default'"
          secondary
          data-test="favorite-toggle"
          @click="toggleFavorite"
        >
          {{ isFavorite ? '★ In favorites' : '☆ Add to favorites' }}
        </NButton>
      </div>
      <ShowMainCard v-if="show.name" :show="show" />
      <div v-if="show._embedded?.cast" class="tv-show__cast">
        <CastFlipCard v-for="cast in show._embedded.cast" :key="cast.person.id" :cast="cast" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { NH1, NButton } from 'naive-ui';
import { useShowStore } from '@/entities/show';
import { useFavoriteShowsStore } from '@/entities/favorite-shows';
import { ShowMainCard, ShowPageSkeleton, CastFlipCard } from '@/features/show-details';
import type { Show } from '@/shared/api/types';

const props = defineProps<{
  id: string | number;
}>();

const showStore = useShowStore();
const favoriteStore = useFavoriteShowsStore();
const show = ref<Show>({} as Show);

const isFavorite = computed(() =>
  show.value.id ? favoriteStore.isFavorite(show.value.id) : false
);

function toggleFavorite() {
  if (show.value.id) {
    favoriteStore.toggleFavorite(show.value);
  }
}

onMounted(async () => {
  const existingShow = showStore.getShow(props.id);
  if (existingShow) {
    show.value = existingShow;
  }
  const fetched = await showStore.fetchShow(props.id);
  if (fetched) {
    show.value = fetched;
  }
});
</script>

<style lang="scss" scoped>
.tv-show {
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;

  &__heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px 16px;
    margin-bottom: 8px;
  }

  &__title {
    margin: 0;
    flex: 1;
    min-width: 0;
  }

  &__cast {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    margin-top: 24px;
  }
}
</style>
