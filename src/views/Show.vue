<template>
  <div class="tv-show">
    <h1 v-show="show.name">{{ show.name }}</h1>
    <img
      v-if="show.image && show.image.medium"
      class="card__image"
      :src="show.image.medium"
      :alt="show.name"
    />
    <div>Premiered: {{ show.premiered | date }}</div>
    <div v-if="show.rating && show.rating.average">Rating: {{ show.rating.average | rate }}</div>
    <p v-html="show.summary"></p>
    <div v-if="show._embedded && show._embedded.cast" class="tv-show__cast">
      <div v-for="cast in show._embedded.cast" :key="cast.id" class="tv-show__actor">
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

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['id'],
  data: function () {
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
