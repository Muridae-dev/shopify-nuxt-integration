<template>
  <div>
    <div v-if="collections" class="collections--container">
      <UiButton
        v-for="collection in collections.collections.edges"
        :href="`/collections/${collection.node.handle}`"
        >{{ collection.node.title }}</UiButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { GetCollections } from "~/utils/ShopifyClient";

const collections = ref();

onMounted(async () => {
  collections.value = await GetCollections();
});
</script>

<style lang="scss">
h1 {
  color: $secondary;
}

body {
  background: $primary-background; /* fallback for old browsers */
  font-family: $base-level-font;
}

.collections--container {
  display: flex;
  padding: 20px var(--side-spacing);
  gap: 10px;

  @include respond-to(sm) {
    flex-direction: column;
  }
}
</style>
