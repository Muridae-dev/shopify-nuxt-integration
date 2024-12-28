<template>
  <ProductPage :product />
</template>

<script setup lang="ts">
const route = useRoute();

const { data: product } = await useAsyncData("product", async () => {
  const fetchedProduct = await GetProduct(route.params.id);
  return fetchedProduct ? fetchedProduct.product : null;
});
</script>
