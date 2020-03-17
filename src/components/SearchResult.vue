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
import ShowsService from '@/services/ShowsService';
import SearchBox from '@/components/SearchBox';
import Card from '@/components/Card';

export default {
  name: 'SearchResult',
  components: {
    SearchBox,
    Card,
  },
  data: function() {
    return {
      shows: [],
    };
  },
  async created() {
    // TODO: fetch popular shows
    this.shows = await ShowsService.getShows('Friends');
  },
  methods: {
    async handleSearch(searchText) {
      this.shows = await ShowsService.getShows(searchText);
    },
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
