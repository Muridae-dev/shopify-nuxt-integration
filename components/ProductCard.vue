<template>
  <NuxtLink
    class="product-card-container"
    :to="
      productIsPartOfCollection(product.collections.edges[0])
        ? `/collections/${route.params.collectionHandler}/products/${product.handle}`
        : `/products/${product.handle}`
    "
  >
    <article class="product-card parent text-sm">
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
      <UiProductImage
        v-if="product.images.edges[0]"
        :imageSrc="product.images.edges[0].node.transformedSrc"
        :imageHoverSrc="
          product.images.edges.length > 1 &&
          product.images.edges[1].node.transformedSrc
        "
        :imageAlt="
          product.images.edges[0].node.altText || `Image for ${product.title}`
        "
      />
    </article>
  </NuxtLink>
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
.product-card-container {
  @include respond-to(sm) {
    width: 100%;
  }
}

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

  figure {
    height: $product-card-width;

    @include respond-to(md) {
      height: $product-card-md-width;
    }

    @include respond-to(sm) {
      height: unset;
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
