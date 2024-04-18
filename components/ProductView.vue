<template>
  <section>
    <TransitionGroup name="fade">
      <div v-if="showProducts" key="products" class="product-container">
        <ProductCard
          v-for="{ node: product } in products"
          v-bind="{ product }"
        />
      </div>

      <div v-if="showLoading" key="loading" class="loading-products">
        LOADING ...
      </div>
    </TransitionGroup>
  </section>
</template>

<script setup lang="ts">
import { GetProducts } from "@/utils/ShopifyClient";
import { ref, onMounted } from "vue";

const products = ref(null);
const showProducts = ref(false); // Initially, do not show products
const showLoading = ref(true); // Initially, show loading

onMounted(async () => {
  const fetchedProducts = await GetProducts();
  products.value = fetchedProducts.products
    ? fetchedProducts.products.edges
    : null;
  setTimeout(() => (showLoading.value = false));
  setTimeout(() => {
    showProducts.value = true; // Start showing products
  }, 400); // Delay to match the fade transition duration
});
</script>

<style scoped lang="scss">
$product-container-padding: 50px;

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
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
