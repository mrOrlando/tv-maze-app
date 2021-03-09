<template>
  <router-link :to="urlOfShow" class="card">
    <div class="card__header">
      <h3 class="card__title" data-test="card-title">{{ show.name }}</h3>
    </div>
    <img class="card__image" v-if="avatar" :src="avatar" :alt="show.name" />
    <p v-html="show.summary"></p>
  </router-link>
</template>

<script>
import { ROUTE_NAMES } from '@/router';

export default {
  name: 'Card',

  props: ['show'],

  computed: {
    urlOfShow() {
      return { name: ROUTE_NAMES.SHOW, params: { id: this.show.id } };
    },

    avatar() {
      return this.show.image?.medium;
    },
  },
};
</script>

<style lang="scss">
.card {
  $root: &;
  text-decoration: none;

  &__header {
    padding: 15px 0;
  }

  &__title {
    font-size: 16px;
    color: #11968a;
    margin: 0;
  }

  &__image {
    transition: all 0.2s;
  }

  &:hover {
    #{$root}__image {
      transform: translateY(-5px);
      box-shadow: 0 0 11px 4px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
