<template>
  <div class="product-carousel-container">
    <ProductCard
      v-if="products"
      v-for="{ node: product } in products"
      v-bind="{ product }"
    />
  </div>
</template>

<script setup lang="ts">
const products = ref();

onMounted(async () => {
  const fetchedProducts = await GetProducts();
  products.value = fetchedProducts.products
    ? fetchedProducts.products.edges
    : null;
});
</script>

<style lang="scss">
.product-carousel-container {
  display: flex;
  gap: 2px;
  overflow: scroll;
  width: 100%;
  color: white;
}
</style>
