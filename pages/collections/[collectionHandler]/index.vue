<template>
  <div>
    <h1 class="collections-title-container">
      Collections:
      {{ collection.title }}
    </h1>
    <ProductView
      v-if="collection.products"
      :products="collection.products.edges"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: collection } = await useAsyncData("products", async () => {
  const fetchedProducts = await GetProductsByCollection(
    route.params.collectionHandler
  );
  return fetchedProducts.collection;
});
</script>

<style lang="scss" scoped>
.collections-title-container {
  padding: 0px var(--side-spacing);
}
</style>
