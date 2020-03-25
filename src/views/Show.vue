<template>
  <div>
    <h1 v-show="show.name">{{ show.name }}</h1>
    <img
      class="card__image"
      v-if="show.image && show.image.medium"
      :src="show.image.medium"
      :alt="show.name"
    />
    <div>Premiered: {{ show.premiered | date }}</div>
    <div v-if="show.rating && show.rating.average">Rating: {{ show.rating.average | rate }}</div>
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
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['id'],
  data: function() {
    return { show: {} };
  },
  computed: mapGetters('shows', ['getShow']),
  methods: mapActions('shows', ['fetchShow']),
  async mounted() {
    const show = this.getShow(this.id);
    if (show) {
      this.show = show;
    }

    // receives additional information about an show
    this.show = await this.fetchShow(this.id);
  },
  filters: {
    rate(rating) {
      if (rating > 7) {
        return `${rating} 👍`;
      } else if (rating < 5) {
        return `${rating} 👎`;
      }
    },
  },
};
</script>
