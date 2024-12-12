<template>
  <section>
    <TransitionGroup name="fade">
      <div v-if="!products" key="loading" class="loading-products">
        LOADING ...
      </div>

      <div v-else key="products" class="product-container">
        <ProductCard
          v-for="{ node: product } in products"
          v-bind="{ product }"
        />
      </div>
    </TransitionGroup>
  </section>
</template>

<script setup lang="ts">
import { GetProducts } from "@/utils/ShopifyClient";

const { data: products } = await useAsyncData("products", async () => {
  const fetchedProducts = await GetProducts();
  return fetchedProducts.products ? fetchedProducts.products.edges : [];
});
</script>

<style scoped lang="scss">
$product-container-padding: 50px;

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  row-gap: 20px;

  padding-top: $product-container-padding;
  padding-bottom: $product-container-padding;

  a {
    text-decoration: none;
  }
}

.loading-products {
  height: calc(100vh - $header-spacing - ($product-container-padding * 2));
  width: 100%;
  background: $primary-background;
  color: $secondary;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "roc-grotesk-extrawide",  sans-serif;
  font-weight: 700;
}
</style>
