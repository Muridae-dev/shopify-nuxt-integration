<template>
  <div>
    Collections:
    {{ collection.title }}
    <ProductView
      v-if="collection.products"
      :products="collection.products.edges"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: collection } = await useAsyncData("products", async () => {
  const fetchedProducts = await GetProductsByCollection(route.params.handle);
  return fetchedProducts.collection;
});
</script>
