<template>
  <div class="actor">
    <ActorPageSkeleton v-if="loading && !person.name" />
    <template v-else-if="person.name">
      <div class="actor__heading">
        <NH1 class="actor__title">{{ person.name }}</NH1>
        <NButton
          v-if="person.id"
          :type="isFavorite ? 'primary' : 'default'"
          secondary
          data-test="favorite-actor-toggle"
          @click="toggleFavorite"
        >
          {{ isFavorite ? '★ In favorites' : '☆ Add to favorites' }}
        </NButton>
      </div>
      <ActorMainCard :person="person" />
      <ActorShowsList :credits="castCredits" />
    </template>
    <NEmpty v-else-if="!loading" description="Actor not found" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NH1, NButton, NEmpty } from 'naive-ui';
import { useFavoriteActorsStore } from '@/entities/favorite-actors';
import {
  ActorMainCard,
  ActorShowsList,
  ActorPageSkeleton,
  useActorPage,
} from '@/features/actor-details';

const props = defineProps<{
  id: string | number;
}>();

const favoriteActorsStore = useFavoriteActorsStore();
const { loading, person, castCredits } = useActorPage(props.id);

const isFavorite = computed(() =>
  person.value.id ? favoriteActorsStore.isFavorite(person.value.id) : false
);

function toggleFavorite() {
  if (person.value.id) {
    favoriteActorsStore.toggleFavorite(person.value);
  }
}
</script>

<style lang="scss" scoped>
.actor {
  max-width: 800px;
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
}
</style>
