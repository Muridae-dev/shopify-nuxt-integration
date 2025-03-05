<template>
  <div>
    <section>
      <h1 class="collections-title-container text-lg">
        {{ collectionName ?? "Show All" }}
      </h1>
      <UiButton
        class="product-filter-button --uppercase"
        variant="secondary"
        :click="() => (filterStore.isActive = !filterStore.isActive)"
      >
        Filters
      </UiButton>
      <div key="products" class="product-container">
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

interface ProductViewProps {
  products: any;
  collectionName?: string;
}

const props = defineProps<ProductViewProps>();

const filterStore = useFilterStore();

const filteredProducts = computed(() => {
  return props.products.filter((product) => {
    return (
      (!filterStore.selectedFilters.productTypes.length ||
        filterStore.selectedFilters.productTypes.includes(
          product.node.productType
        )) &&
      (!filterStore.selectedFilters.colors.length ||
        product.node.variants.edges.some(({ node }) =>
          node.selectedOptions.some(
            (opt) =>
              opt.name.toLowerCase() === "color" &&
              filterStore.selectedFilters.colors.includes(opt.value)
          )
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
  padding: 10px 20px;
  z-index: 99;
}

.loading-products {
  height: calc(100vh - $header-spacing - ($product-container-padding * 2));
  width: 100%;
  background: $primary-background;
  color: var(--secondary);

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "roc-grotesk-extrawide",  sans-serif;
  font-weight: 700;
}
</style>
