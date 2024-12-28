<template>
  <div>
    <NuxtLink
      :to="
        productIsPartOfCollection(product.collections.edges[0])
          ? `/collections/${route.params.collectionHandler}/products/${product.handle}`
          : `/products/${product.handle}`
      "
    >
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
        <figure class="product-image-container">
          <img
            v-if="product.images.edges[0]"
            :alt="
              product.images.edges[0].node.altText ||
              `Image for ${product.title}`
            "
            :src="product.images.edges[0].node.originalSrc"
          />
        </figure>
      </article>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface ProductCardProps {
  product: any;
}

defineProps<ProductCardProps>();

const route = useRoute();

const productIsPartOfCollection = (cardCollection: any) => {
  return (
    cardCollection &&
    route.params.collectionHandler === cardCollection.node.handle
  );
};
</script>

<style lang="scss">
.product-card {
  width: $product-card-size;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: $primary;
  background: $card-background;

  &:hover {
    .product-image-container {
      background-color: $card-image-background--hover;
    }
  }

  .product-image-container {
    position: relative;
    display: flex;
    justify-content: center;
    height: $product-card-size;
    aspect-ratio: 1;
    padding: 10px;
    background-color: $card-image-background;

    order: 1;

    img {
      object-fit: contain;
      width: 100%;
    }
  }

  .product-info {
    order: 2;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-top: 10px;
    height: 100%;

    font-family: $card-title-font;

    h2 {
      font-size: 1rem;
      line-height: 1.4rem;
      font-weight: 500;
    }

    .product-collection {
      font-size: 0.8rem;
      line-height: 0.8rem;
      font-family: $card-collection-font;
    }

    .product-price {
      font-size: 1rem;
      line-height: 1rem;
      font-family: $card-price-font;
    }
  }
}
</style>
