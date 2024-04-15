<template>
  <section class="product-container">
    <NuxtLink
      v-if="products"
      v-for="{ node: product } in products"
      :to="`/products/${getProductId(product.id)}`"
    >
      <article class="product-card">
        <h2>
          <span>{{ product.title }}</span>
          {{
            product.variants.edges[0].node.price.amount +
            product.variants.edges[0].node.price.currencyCode
          }}
        </h2>
        <img
          :alt="
            product.images.edges[0].node.altText || `Image for ${product.title}`
          "
          :src="product.images.edges[0].node.originalSrc"
        />
      </article>
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { GetProducts } from "@/utils/ShopifyClient";

const products = ref<any>();
const getProductId = (idToFormat: string) => {
  return idToFormat.split("Product/")[1];
};

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
    flex-direction: row;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
