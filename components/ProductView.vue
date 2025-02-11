<template>
  <section>
    <div key="products" class="product-container">
      <ProductCard v-for="{ node: product } in products" v-bind="{ product }" />
    </div>
  </section>
</template>

<script setup lang="ts">
interface ProductViewProps {
  products: any;
}

defineProps<ProductViewProps>();
</script>

<style scoped lang="scss">
$product-container-padding: 50px;

.product-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  row-gap: 20px;

  padding: $product-container-padding var(--side-spacing);

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
