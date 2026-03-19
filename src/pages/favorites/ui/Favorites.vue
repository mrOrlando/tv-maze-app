<template>
  <div class="favorites" data-test="favorites-page">
    <NH1>Favorites</NH1>

    <section class="favorites__section" aria-labelledby="favorites-shows-heading">
      <h2 id="favorites-shows-heading" class="favorites__section-title">Shows</h2>
      <NEmpty v-if="!favoriteShows.length" description="No favorite shows yet.">
        <template #extra>
          <RouterLink v-slot="{ navigate }" :to="{ name: ROUTE_NAMES.HOME }">
            <NButton type="primary" @click="navigate">Browse shows</NButton>
          </RouterLink>
        </template>
      </NEmpty>
      <div v-else class="favorites__grid">
        <Card v-for="show in favoriteShows" :key="show.id" class="favorites__item" :show="show" />
      </div>
    </section>

    <section class="favorites__section" aria-labelledby="favorites-actors-heading">
      <h2 id="favorites-actors-heading" class="favorites__section-title">Actors</h2>
      <NEmpty v-if="!favoriteActors.length" description="No favorite actors yet.">
        <template #extra>
          <RouterLink v-slot="{ navigate }" :to="{ name: ROUTE_NAMES.HOME }">
            <NButton type="primary" @click="navigate">Find shows & actors</NButton>
          </RouterLink>
        </template>
      </NEmpty>
      <div v-else class="favorites__grid">
        <PersonCard
          v-for="person in favoriteActors"
          :key="person.id"
          class="favorites__item"
          :person="person"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NH1, NButton, NEmpty } from 'naive-ui';
import { useFavoriteShowsStore } from '@/entities/favorite-shows';
import { useFavoriteActorsStore } from '@/entities/favorite-actors';
import { Card } from '@/entities/show';
import { PersonCard } from '@/entities/person';
import { ROUTE_NAMES } from '@/app/routes';

const showsStore = useFavoriteShowsStore();
const actorsStore = useFavoriteActorsStore();
const { favorites: favoriteShows } = storeToRefs(showsStore);
const { favorites: favoriteActors } = storeToRefs(actorsStore);
</script>

<style lang="scss" scoped>
.favorites {
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;

  &__section {
    margin-top: 2rem;

    &:first-of-type {
      margin-top: 1.5rem;
    }
  }

  &__section-title {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.3;
  }

  &__grid {
    display: grid;
    gap: 1.25rem 1.5rem;
    grid-template-columns: minmax(0, 1fr);

    @media (min-width: 520px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
}
</style>
