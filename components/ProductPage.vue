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
        <img :src="product.images.edges[0].node.originalSrc" />
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
  max-width: 1440px;
  margin: auto;
  color: $secondary;
  display: flex;
  justify-content: space-between;
  gap: 50px;
  margin-top: 50px;
  margin-bottom: 50px;

  padding: 0px var(--side-spacing);

  flex-direction: row;
  flex-wrap: wrap;

  @include respond-to(sm) {
    flex-direction: column;
    align-items: center;
  }

  .product-info {
    max-width: 40%;
    display: flex;
    flex-direction: column;
    gap: 30px;

    @include respond-to(sm) {
      max-width: unset;
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
    width: 50%;
    order: -1;

    @include respond-to(sm) {
      width: 100%;
    }

    img {
      width: 100%;
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
