<template>
  <ProductView v-if="products" :products />
</template>

<script setup lang="ts">
import { GetProducts } from "@/utils/ShopifyClient";

const { data: products } = await useAsyncData("products", async () => {
  const fetchedProducts = await GetProducts();
  return fetchedProducts.products ? fetchedProducts.products.edges : [];
});
</script>
