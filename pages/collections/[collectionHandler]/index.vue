<template>
  <div>
    <h1 class="collections-title-container text-lg">
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
  margin: 0 var(--side-spacing);
  padding: 10px 0;

  border-bottom: 1px solid black;
}
</style>
