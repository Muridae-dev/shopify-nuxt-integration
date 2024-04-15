<template>
  <section class="product-container">
    <article
      v-if="products"
      v-for="{ node: product } in products"
      class="product-card"
    >
      <h2>
        <span>{{ product.title }}</span>
      </h2>
      <img
        :alt="
          product.images.edges[0].node.altText || `Image for ${product.title}`
        "
        :src="product.images.edges[0].node.originalSrc"
      />
    </article>
  </section>
</template>

<script setup lang="ts">
import { GetProducts } from "@/utils/ShopifyClient";

const products = ref<any>();

onMounted(async () => {
  const fetchedProducts = await GetProducts();
  products.value = fetchedProducts.products
    ? fetchedProducts.products.edges
    : null;
});
</script>

<style scoped lang="scss">
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
  row-gap: 20px;
}
.product-card {
  width: 400px;
  display: flex;
  flex-direction: column;
  color: $primary;
  background: $card-background;
  border-radius: 7px;

  img {
    width: auto;
    padding: 10px;
    border-bottom: 1px solid;
    border-color: $primary-background;

    order: 1;
  }

  h2 {
    order: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
      padding-left: 10px;
    }
  }
}
</style>
