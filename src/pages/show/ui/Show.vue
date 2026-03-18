<template>
  <div class="tv-show">
    <NH1 v-if="show.name">{{ show.name }}</NH1>
    <ShowMainCard v-if="show.name" :show="show" />
    <div v-if="show._embedded?.cast" class="tv-show__cast">
      <CastFlipCard
        v-for="cast in show._embedded.cast"
        :key="cast.person.id"
        :cast="cast"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { NH1 } from 'naive-ui';
import { useShowStore } from '@/entities/show';
import { ShowMainCard, CastFlipCard } from '@/features/show-details';
import type { Show } from '@/shared/api/types';

const props = defineProps<{
  id: string | number;
}>();

const showStore = useShowStore();
const show = ref<Show>({} as Show);

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

  &__cast {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    margin-top: 24px;
  }
}
</style>
