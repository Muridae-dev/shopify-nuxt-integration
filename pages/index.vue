<template>
  <div>
    <div v-if="collections" class="collections--container">
      <UiButton
        v-for="collection in collections.collections.edges"
        :text="collection.node.title"
        :href="`/collections/${collection.node.handle}`"
      />
    </div>
    <!-- <ProductCarousel /> -->
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
  padding-top: 20px;
  padding-bottom: 20px;
  padding: 10px;
  gap: 10px;

  @include respond-to(sm) {
    flex-direction: column;
  }
}
</style>
