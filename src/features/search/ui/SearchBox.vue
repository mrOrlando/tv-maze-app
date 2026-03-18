<template>
  <form class="search-panel" @submit.prevent="handleSearch">
    <NSpace vertical :size="12">
      <NInputGroup>
        <NInput
          v-model:value="searchText"
          type="text"
          placeholder="Enter a show name"
          :input-props="{ 'data-test': 'search-input' } as Record<string, string>"
          clearable
          @keyup.enter="handleSearch"
        />
        <NButton type="primary" attr-type="submit">Search</NButton>
      </NInputGroup>
    </NSpace>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NInput, NInputGroup, NButton, NSpace } from 'naive-ui';

const emit = defineEmits<{
  (e: 'change-search-box', searchText: string): void;
}>();
const searchText = ref('');

function handleSearch() {
  emit('change-search-box', searchText.value);
}
</script>

