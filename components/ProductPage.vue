<template>
  <div>
    <div v-if="product" class="product-container">
      <div class="product-info">
        <h1>{{ product.title }}</h1>
        <div class="product-price">
          Price:
          <span>{{
            product.variants.edges[0].node.price.amount +
            product.variants.edges[0].node.price.currencyCode
          }}</span>
        </div>
        <div class="product-description">
          Description:<span>{{ product.description }}</span>
        </div>

        <div class="product-breadcrumb">
          {{ `${breadcrumb[1]} / ${breadcrumb[2]}` }}
        </div>

        <UiButton text="ADD TO CART" :click="cartUpdateHelper" />
      </div>
      <div class="product-image-container">
        <img
          v-for="productImage in product.images.edges"
          :src="productImage.node.originalSrc"
          class="product-image--desktop"
          :class="product.images.edges.length > 1 && '--inactive-mobile'"
        />

        <ProductCarousel
          v-if="product.images.edges.length > 1"
          :imageArray="product.images.edges"
          class="product-image-carousel--mobile"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";

interface ProductPageProps {
  product: any;
}

const props = defineProps<ProductPageProps>();
const route = useRoute();

console.log("product", props.product);

const breadcrumb = route.path.split("/");

const { updateCart } = useCartStore();

const cartUpdateHelper = () => {
  const productObject = {
    id: props.product.variants.edges[0].node.id,
    quantity: 1,
    price: props.product.variants.edges[0].node.price.amount,
  };

  updateCart(productObject);
};
</script>

<style scoped lang="scss">
.product-container {
  width: 100%;
  margin: auto;
  color: $secondary;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-top: 50px;
  margin-bottom: 50px;

  padding: 0px var(--side-spacing);

  flex-direction: row;

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

    .product-breadcrumb {
      text-transform: uppercase;
      font-weight: bold;
      order: -1;
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
        width: 60%;
        font-weight: normal;
        text-transform: none;
      }
    }

    .product-price {
      font-family: $product-price-font;
    }

    .product-description {
      font-family: $product-description-font;
    }
  }

  .product-image-container {
    display: flex;
    flex-direction: column;
    width: 50%;
    order: -1;

    @include respond-to(sm) {
      width: 100%;
    }

    .product-image--desktop {
      width: 100%;

      &.--inactive-mobile {
        @include respond-to(sm) {
          display: none;
        }
      }
    }

    .product-image-carousel--mobile {
      display: none;

      @include respond-to(sm) {
        display: inline;
      }
    }
  }

  h1 {
    color: $secondary;
    padding-bottom: 30px;
    border-bottom: 1px solid;
    border-color: rgba($secondary, 0.5);
    font-family: $product-title-font;
  }
}
</style>
