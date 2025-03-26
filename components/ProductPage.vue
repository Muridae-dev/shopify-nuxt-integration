<template>
  <div>
    <div v-if="product" class="product-container text-md">
      <div class="product-info">
        <strong aria-label="breadcrumb" class="--uppercase">
          {{ `${breadcrumb[1]} / ${breadcrumb[2]}` }}
        </strong>
        <h1 class="text-xl">{{ product.title }}</h1>
        <div class="product-price">
          Price:
          <span>{{
            // TODO: Check if theres multiple price-pools & look into displaying both
            product.variants.edges[0].node.price.amount +
            product.variants.edges[0].node.price.currencyCode
          }}</span>
        </div>
        <div class="product-description">
          Description:
          <span v-html="product.descriptionHtml" />
        </div>

        <UiButton :click="cartUpdateHelper">
          <span v-if="!cartStore.cartUpdating" class="--bold">ADD TO CART</span>
          <UiLoader v-else />
        </UiButton>
      </div>
      <div class="product-page-image-container">
        <!-- TODO: Look into disabling this entirely on mobile -or if it does impact performance. -->
        <img
          v-for="productImage in product.images.edges"
          :src="productImage.node.transformedSrc"
          class="product-page-image--desktop"
          :class="product.images.edges.length > 1 && '--inactive-mobile'"
        />

        <ProductCarousel
          v-if="product.images.edges.length > 1"
          :imageArray="product.images.edges"
          class="product-page-image-carousel--mobile"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "~/types/shopify";

interface ProductPageProps {
  product: ShopifyProduct;
}

const props = defineProps<ProductPageProps>();
const route = useRoute();

const breadcrumb = route.path.split("/");

const cartStore = useCartStore();

const cartUpdateHelper = () => {
  const productObject = {
    id: props.product.variants.edges[0].node.id,
    quantity: 1,
    title: props.product.title,
  };

  cartStore.updateCart(productObject);
};
</script>

<style scoped lang="scss">
.product-container {
  width: 100%;
  margin: auto;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;

  color: var(--secondary);
  gap: 20px;
  margin-top: 50px;
  margin-bottom: 50px;

  padding: 0px var(--side-spacing);

  @include respond-to(sm) {
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }

  .product-info {
    position: sticky;
    top: $header-spacing;
    left: 0;
    width: 50%;

    display: flex;
    flex-direction: column;
    gap: 30px;

    @include respond-to(sm) {
      width: 100%;
    }

    .product-price,
    .product-description {
      display: flex;
      gap: 20px;
      justify-content: space-between;

      text-align: left;
      font-weight: bold;
      text-transform: uppercase;

      span {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 60%;

        font-weight: normal;
        text-transform: none;
      }
    }
  }

  .product-page-image-container {
    display: flex;
    flex-direction: column;
    width: 50%;
    order: -1;

    @include respond-to(sm) {
      width: 100%;
    }

    .product-page-image--desktop {
      width: 100%;

      &.--inactive-mobile {
        @include respond-to(sm) {
          display: none;
        }
      }
    }

    .product-page-image-carousel--mobile {
      display: none;

      @include respond-to(sm) {
        display: inline;
      }
    }
  }

  h1 {
    padding-bottom: 30px;
    border-bottom: 1px solid;
    border-color: var(--secondary);
  }
}
</style>
