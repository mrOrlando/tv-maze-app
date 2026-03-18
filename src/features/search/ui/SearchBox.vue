<template>
  <form class="search-panel" @submit.prevent="handleSearch">
    <input
      v-model="searchText"
      class="search-panel__input"
      type="text"
      placeholder="Enter a show name"
      data-test="search-input"
    />
    <button class="search-panel__button" type="submit">Search</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'change-search-box', searchText: string): void;
}>();
const searchText = ref('');

function handleSearch() {
  emit('change-search-box', searchText.value);
}
</script>

<style lang="scss">
.search-panel {
  padding-bottom: 20px;

  &__input {
    font-size: 20px;
    padding: 16px 16px 16px 60px;
    border: none;
    outline: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px 1px rgba(0, 0, 0, 0.03);
  }

  &__button {
    font-size: 16px;
    text-decoration: none;
    color: #fff;
    background-color: #26a69a;
    text-align: center;
    letter-spacing: 0.5px;
    transition: 0.2s ease-out;
    cursor: pointer;
    padding: 16px;
    border: 0;
  }
}
</style>
