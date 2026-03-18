<template>
  <div class="actor">
    <ActorPageSkeleton v-if="loading && !person.name" />
    <template v-else-if="person.name">
      <NH1>{{ person.name }}</NH1>
      <ActorMainCard :person="person" />
      <ActorShowsList :credits="castCredits" />
    </template>
    <NEmpty v-else-if="!loading" description="Actor not found" />
  </div>
</template>

<script setup lang="ts">
import { NH1, NEmpty } from 'naive-ui';
import { ActorMainCard, ActorShowsList, ActorPageSkeleton, useActorPage } from '@/features/actor-details';

const props = defineProps<{
  id: string | number;
}>();

const { loading, person, castCredits } = useActorPage(props.id);
</script>

<style lang="scss" scoped>
.actor {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}
</style>
