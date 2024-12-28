<template>
  <div>
    <div v-if="collections">
      <NuxtLink
        v-for="collection in collections.collections.edges"
        :to="`/collections/${collection.node.handle}`"
      >
        <button>
          {{ collection.node.title }}
        </button>
      </NuxtLink>
    </div>
    <ProductCarousel />
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
</style>
