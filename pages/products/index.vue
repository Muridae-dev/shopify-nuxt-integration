<template>
  <ProductView
    v-if="productStore.products.length"
    :products="productStore.products"
  />
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();

productStore.fetchProducts();
</script>
