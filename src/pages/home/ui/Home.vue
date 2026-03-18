<template>
  <div class="home">
    <SearchResult />
  </div>
</template>

<script>
import { SearchResult } from '@/widgets/search-result';

export default {
  name: 'Home',
  components: {
    SearchResult,
  },
};
</script>
