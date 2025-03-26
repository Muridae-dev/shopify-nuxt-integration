<template>
  <div>
    <section>
      <h1
        class="collections-title-container text-lg"
        aria-label="Viewing collection"
      >
        {{ collectionName ?? "Show All" }}
      </h1>
      <UiCollections />
      <UiButton
        class="product-filter-button --uppercase"
        variant="secondary"
        :click="() => (filterStore.isActive = !filterStore.isActive)"
      >
        Filters
      </UiButton>
      <div class="product-container">
        <ProductCard
          v-for="{ node: product } in filteredProducts"
          v-bind="{ product }"
        />
      </div>
    </section>
    <NavigationFilters />
  </div>
</template>

<script setup lang="ts">
import { useFilterStore } from "@/stores/filterStore";
import type { ShopifyProductNode } from "~/types/shopify";

interface ProductViewProps {
  products: ShopifyProductNode;
  collectionName?: string;
}

const props = defineProps<ProductViewProps>();

const filterStore = useFilterStore();

// TODO: Look into moving this into filterStore
const filteredProducts = computed(() => {
  return props.products.filter((product) => {
    return (
      (!filterStore.selectedFilters.productTypes.length ||
        filterStore.selectedFilters.productTypes.includes(
          product.node.productType
        )) &&
      (!filterStore.selectedFilters.tags.length ||
        product.node.tags.some((tag) =>
          filterStore.selectedFilters.tags.includes(tag)
        ))
    );
  });
});
</script>

<style scoped lang="scss">
$product-container-padding: 20px;

.product-container {
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;

  padding: $product-container-padding var(--side-spacing);

  a {
    text-decoration: none;
  }
}

.collections-title-container {
  margin: 0 var(--side-spacing);
  padding: 10px 0;

  border-bottom: 1px solid black;
}

.product-filter-button {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;

  padding: 10px 20px;
}
</style>
