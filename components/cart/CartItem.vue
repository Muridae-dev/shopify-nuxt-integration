<template>
  <div class="cart-product parent text-sm --uppercase">
    <UiProductImage
      :imageSrc="product.merchandise.image?.transformedSrc"
      :imageAlt="
        product.merchandise.image?.altText ??
        `Image for ${product.merchandise.product.title}`
      "
      :imageLink="product.merchandise.product.handle"
    />

    <div class="cart-product-info">
      <NuxtLink
        :to="`/products/${product.merchandise.product.handle}`"
        class="cart-product-title"
        >{{ product.merchandise.product.title }}</NuxtLink
      >
      <span class="cart-product-cost">{{
        `${product.cost.amountPerQuantity.amount} ${product.cost.amountPerQuantity.currencyCode}`
      }}</span>
      <div class="cart-product-quantity">
        <button
          @click="quantityRef = quantityRef - 1"
          :disabled="quantityRef === 0"
        >
          -
        </button>
        <input
          class="cart-product-quantity-input"
          @change="(e) => (quantityRef = parseInt((e.target as HTMLInputElement).value))"
          :value="quantityRef"
          :aria-label="`Quantity of ${product.merchandise.product.title} in cart`"
          :name="`cart-item-${product.id}-qty`"
        />
        <button @click="quantityRef = quantityRef + 1">+</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ShopifyCartProduct } from "~/types/shopify";

interface CartItemProps {
  product: ShopifyCartProduct;
  quantity: number;
}

const props = defineProps<CartItemProps>();

const quantityRef = ref(props.quantity);

const updateCart = ({ product, quantity }: CartItemProps) => {
  const { cartId } = useCartStore();
  const productInfo = {
    id: product.id,
    merchandiseId: product.merchandise.id,
    quantity: quantity,
  };

  ShopifyUpdateLineItem({ cartId, product: productInfo });
};

watch(quantityRef, (newQuantity) => {
  updateCart({ product: props.product, quantity: newQuantity });
});
</script>

<style lang="scss">
.cart-product {
  height: 150px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;

  .cart-product-title {
    color: inherit;
    text-decoration: underline;
  }

  .cart-product-info {
    width: 100%;

    display: flex;
    justify-content: space-evenly;
    flex-direction: column;

    .cart-product-quantity {
      display: inline-flex;
      align-items: center;
      gap: 0px;
      padding-top: 10px;

      button,
      input {
        width: 32px;
        height: 32px;

        background: transparent;
        color: var(--secondary);
        border: 1px solid;
        border-color: var(--secondary);

        text-align: center;
        font-family: $base-level-font;

        &[disabled],
        &:disabled {
          background: rgb(242, 242, 242);
          color: rgb(98, 98, 98);
          cursor: not-allowed;
        }
      }

      input {
        border-right: none;
        border-left: none;
      }
    }
  }
}
</style>
