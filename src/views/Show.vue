<template>
  <div>
    <h1>This is a Show page {{ show.name }}</h1>
  </div>
</template>

<script>
import ShowsService from '@/services/ShowsService';

export default {
  props: ['id'],
  data: function() {
    return { show: {} };
  },
  async created() {
    this.show = await ShowsService.getShow(this.id);
  },
};
</script>
