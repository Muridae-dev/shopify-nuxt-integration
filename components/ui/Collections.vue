<template>
  <div v-if="collections" class="collections--container">
    <UiButton
      v-for="collection in collections.collections.edges"
      :href="`/collections/${collection.node.handle}`"
      >{{ collection.node.title }}</UiButton
    >
  </div>
</template>

<script setup lang="ts">
import { GetCollections } from "~/utils/ShopifyClient";

const collections = await GetCollections();
</script>

<style lang="scss">
.collections--container {
  display: flex;
  padding: 20px var(--side-spacing);
  padding-bottom: 0px;
  gap: 10px;

  @include respond-to(sm) {
    flex-direction: column;
  }
}
</style>
