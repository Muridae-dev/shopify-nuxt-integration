<template>
  <div>
    <div v-if="collections">
      <button v-for="collection in collections.collections.edges">
        {{ collection.node.title }}
      </button>
      <pre>
        {{ collections }}
      </pre>
    </div>
    <ProductCarousel />
  </div>
</template>

<script setup lang="ts">
import { GetCollections } from "~/utils/ShopifyClient";

const collections = ref();

onMounted(async () => {
  collections.value = await GetCollections();
  console.log(collections);
});
</script>

<style lang="scss">
h1 {
  color: $secondary;
}

body {
  background: $primary-background; /* fallback for old browsers */
  font-family: "roc-grotesk",  sans-serif;
}
</style>
