<template>
  <div class="search-result">
    <SearchBox @change-search-box="handleSearch"></SearchBox>
    <div class="search-result__content">
      <Card
        v-for="show in shows"
        className="search-result__item"
        :show="show"
        :key="show.id"
      ></Card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SearchBox from '@/components/SearchBox';
import Card from '@/components/Card';

export default {
  name: 'SearchResult',
  components: {
    SearchBox,
    Card,
  },
  computed: mapGetters(['shows']),
  async mounted() {
    // TODO: fetch popular shows
    // this.$store.dispatch('fetchShows');
    this.fetchShows('Friends');
  },
  methods: {
    async handleSearch(searchText) {
      this.fetchShows(searchText);
    },
    ...mapActions(['fetchShows']),
  },
};
</script>

<style lang="scss">
.search-result {
  &__content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  &__item {
    display: flex;
    flex-direction: column;
    max-width: 300px;
  }
}
</style>
