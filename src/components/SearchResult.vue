<template>
  <div class="search-result">
    <SearchBox @change-search-box="handleSearch"></SearchBox>
    <div class="search-result__content">
      <Card v-for="show in shows" class="search-result__item" :show="show" :key="show.id"></Card>
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
  computed: mapGetters('shows', ['shows']),
  async mounted() {
    // this.$store.dispatch('shows/fetchShows');
    this.fetchShows();
  },
  methods: {
    async handleSearch(searchText) {
      this.fetchShows(searchText);
    },
    ...mapActions('shows', ['fetchShows']),
  },
};
</script>

<style lang="scss">
.search-result {
  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 4%;
  }
}
</style>
