<template>
  <div class="home">
    <SearchResult />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchResult from '@/components/SearchResult.vue';

export default {
  name: 'Home',
  components: {
    SearchResult,
  },
};
</script>
