<template>
  <div>
    <ProductView
      v-if="productStore.products.length"
      :products="productStore.products"
      :collectionName="productStore.collection?.title"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/stores/productStore";
import { useRoute } from "vue-router";
import { watchEffect } from "vue";

const productStore = useProductStore();
const route = useRoute();

// Automatically fetch products when the route changes
watchEffect(() => {
  const collectionHandler = route.params.collectionHandler;

  if (collectionHandler) {
    productStore.fetchProductsByCollection(collectionHandler as string);
  }
});
</script>
