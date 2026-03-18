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
import { formatDate as formatDateHelper } from '@/helpers/date.helper';

export default {
  props: ['id'],
  data() {
    return { show: {} };
  },
  computed: mapGetters('shows', ['getShow']),
  async mounted() {
    const show = this.getShow(this.id);
    if (show) {
      this.show = show;
    }
    this.show = await this.fetchShow(this.id);
  },
  methods: {
    ...mapActions('shows', ['fetchShow']),
    formatDate: formatDateHelper,
    formatRate(rating) {
      if (rating > 7) {
        return `${rating} 👍`;
      }
      if (rating < 5) {
        return `${rating} 👎`;
      }
      return String(rating);
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
