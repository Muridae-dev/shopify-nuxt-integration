<template>
  <Carousel v-if="products" :items-to-show="5">
    <Slide v-for="{ node: product } in products" :key="product.id">
      <ProductCard v-bind="{ product }" />
    </Slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
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
.carousel__prev,
.carousel__next {
  color: white;
  mix-blend-mode: difference;

  &:hover {
    color: red;
  }
}

.carousel__pagination-button {
  &:hover {
    &::after {
      background: blue;
    }
  }
  &::after {
    background: $primary;
  }
}

.carousel__pagination-button--active::after {
  background: red;
}
</style>
