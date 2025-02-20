<template>
  <div>
    <NuxtLink
      :to="
        productIsPartOfCollection(product.collections.edges[0])
          ? `/collections/${route.params.collectionHandler}/products/${product.handle}`
          : `/products/${product.handle}`
      "
    >
      <article class="product-card text-sm">
        <div class="product-info">
          <h2 class="text-sm">{{ product.title }}</h2>
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
$product-card-width: calc($product-card-size - var(--side-spacing) / 2);
$product-card-md-width: calc(50vw - (var(--side-spacing)));

.product-card {
  width: $product-card-width;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: $primary;
  background: $card-background;

  @include respond-to(md) {
    width: $product-card-md-width;
  }

  @include respond-to(sm) {
    width: 100%;
  }

  .product-image-container {
    position: relative;
    display: flex;
    justify-content: center;
    height: $product-card-width;
    aspect-ratio: 1;
    padding: 5px;
    background-color: $card-image-background;

    order: 1;

    @include respond-to(md) {
      height: $product-card-md-width;
    }

    @include respond-to(sm) {
      height: unset;
    }

    img {
      object-fit: contain;
      width: 100%;
    }
  }

  &:hover {
    .product-image-container {
      background-color: $card-image-background--hover;
    }

    h2 {
      text-decoration: underline;
    }
  }

  .product-info {
    order: 2;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-top: 10px;
    height: 100%;
  }
}
</style>
