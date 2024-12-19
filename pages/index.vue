<template>
  <div>
    <div v-if="collections">
      <NuxtLink
        v-for="collection in collections.collections.edges"
        :to="`/collections/${getCollectionId(collection.node.id)}`"
      >
        <button>
          {{ collection.node.title }}
        </button>
      </NuxtLink>
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

const getCollectionId = (idToFormat: string) =>
  idToFormat.split("Collection/")[1];

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
  font-family: "roc-grotesk",  sans-serif;
}
</style>
