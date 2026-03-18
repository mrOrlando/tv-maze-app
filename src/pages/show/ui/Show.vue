<template>
  <div class="tv-show">
    <h1 v-show="show.name">{{ show.name }}</h1>
    <img
      v-if="show.image && show.image.medium"
      class="card__image"
      :src="show.image.medium"
      :alt="show.name"
    />
    <div>Premiered: {{ formatDate(show.premiered) }}</div>
    <div v-if="show.rating && show.rating.average">
      Rating: {{ formatRate(show.rating.average) }}
    </div>
    <p v-html="show.summary"></p>
    <div v-if="show._embedded && show._embedded.cast" class="tv-show__cast">
      <div v-for="cast in show._embedded.cast" :key="cast.person.id" class="tv-show__actor">
        {{ cast.person.name }}
        <img
          v-if="cast.person.image && cast.person.image.medium"
          class="tv-show__actor-img"
          :src="cast.person.image.medium"
          :alt="show.name"
        />
        {{ cast.character.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useShowStore } from '@/entities/show';
import { formatDate as formatDateHelper } from '@/shared/lib/date';
import type { Show } from '@/shared/api/types';

const props = defineProps<{
  id: string | number;
}>();

const showStore = useShowStore();
const show = ref<Show>({} as Show);

function formatDate(value: string | undefined | null) {
  return formatDateHelper(value);
}

function formatRate(rating: number) {
  if (rating > 7) {
    return `${rating} 👍`;
  }
  if (rating < 5) {
    return `${rating} 👎`;
  }
  return String(rating);
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

<style lang="scss">
.tv-show {
  &__cast {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1%;
  }

  &__actor {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__actor-img {
    max-width: 250px;
  }
}
</style>
