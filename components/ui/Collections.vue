<template>
  <div v-if="collections" class="collections--container">
    <div
      class="collections-button-container"
      v-for="collection in collections.collections.edges"
    >
      <!-- TODO: Add show all & maybe what collection is active -->
      <UiButton :href="`/collections/${collection.node.handle}`">{{
        collection.node.title
      }}</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GetCollections } from "~/utils/ShopifyClient";

const collections = await GetCollections();
</script>

<style lang="scss">
.collections--container {
  display: flex;
  flex-wrap: wrap;

  padding: 20px var(--side-spacing);
  padding-bottom: 0px;
  gap: 10px;

  @include respond-to(sm) {
    flex-direction: column;
  }
}

.collections-button-container {
  width: calc(25% - 8px); // TODO: FIX THIS

  @include respond-to(sm) {
    width: unset;
  }
}
</style>
