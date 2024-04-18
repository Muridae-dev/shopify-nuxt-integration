<template>
  <div>
    <NuxtLink :to="`/products/${getProductId(product.id)}`">
      <article class="product-card">
        <div class="product-info">
          <h2>{{ product.title }}</h2>
          <span class="product-collection">
            <span
              v-if="product.collections.edges[0]"
              v-for="(collection, index) in product.collections.edges"
            >
              {{
                index !== product.collections.edges.length - 1
                  ? `${collection.node.title} / `
                  : collection.node.title
              }}
            </span>
          </span>
          <span class="product-price">
            {{
              product.variants.edges[0].node.price.amount +
              product.variants.edges[0].node.price.currencyCode
            }}
          </span>
        </div>
        <img
          :alt="
            product.images.edges[0].node.altText || `Image for ${product.title}`
          "
          :src="product.images.edges[0].node.originalSrc"
        />
      </article>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface ProductCardProps {
  product: any;
}

defineProps<ProductCardProps>();

const getProductId = (idToFormat: string) => idToFormat.split("Product/")[1];
</script>

<style lang="scss">
.product-card {
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: $primary;
  background: $card-background;

  img {
    width: auto;
    padding: 10px;
    border-bottom: 1px solid;
    border-color: $primary-background;

    order: 1;
  }

  .product-info {
    order: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    align-items: center;
    padding: 10px;

    font-family: "roc-grotesk",  sans-serif;

    h2 {
      font-size: 1.4rem;
      line-height: 1.4rem;
      font-weight: 500;
    }

    .product-collection {
      font-size: 0.8rem;
      line-height: 0.8rem;
      height: 0.8rem;
    }

    .product-price {
      font-size: 1rem;
      line-height: 1rem;
    }
  }
}
</style>
