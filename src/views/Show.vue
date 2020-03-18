<template>
  <div>
    <h1 v-show="show.name">{{ show.name }}</h1>
    <img
      class="card__image"
      v-if="show.image && show.image.medium"
      :src="show.image.medium"
      :alt="show.name"
    />
    <p v-html="show.summary"></p>
    <div v-if="show._embedded && show._embedded.cast">
      <div v-for="cast in show._embedded.cast" :key="cast.id">
        {{ cast.person.name }}
        <img
          v-if="cast.person.image && cast.person.image.medium"
          :src="cast.person.image.medium"
          :alt="show.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ShowsService from '@/services/ShowsService';

export default {
  props: ['id'],
  data: function() {
    return { show: {} };
  },
  computed: mapGetters('shows', ['getShow']),
  async mounted() {
    this.show = this.getShow(this.id);
    // receives additional information about an show
    this.show = await ShowsService.getShow(this.id);
  },
};
</script>
