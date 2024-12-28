<template>
  <div class="cart-product">
    <img class="cart-product-image" :src="product.merchandise.image.url" />

    <div class="cart-product-info">
      <span class="cart-product-title">{{
        product.merchandise.product.title
      }}</span>
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
          @change="(e) => (quantityRef = (e.target as HTMLInputElement).value)"
          :value="quantityRef"
        />
        <button @click="quantityRef = quantityRef + 1">+</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

interface CartItemProps {
  product: any;
  quantity: any;
}

const props = defineProps<CartItemProps>();

const quantityRef = ref(props.quantity);

const updateCart = ({ product, quantity }: any) => {
  const { cartId } = useCartStore();
  const productInfo = {
    id: product.id,
    merchandiseId: product.merchandise.id,
    quantity: parseInt(quantity),
  };

  ShopifyUpdateLineItem({ cartId, product: productInfo });
};

watch(quantityRef, (newQuantity) => {
  updateCart({ product: props.product, quantity: newQuantity });
});
</script>

<style lang="scss">
.cart-product {
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  gap: 50px;
  justify-content: space-between;
  align-items: center;
  height: 150px;

  .cart-product-image {
    height: 100%;
    object-fit: contain;
    overflow: hidden;
    aspect-ratio: 2/1;
  }

  .cart-product-info {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;

    .cart-product-title {
      font-weight: bold;
    }

    .cart-product-quantity {
      display: inline-flex;
      align-items: center;
      gap: 0px;
      padding-top: 10px;
      button,
      input {
        background: transparent;
        color: $secondary;
        text-align: center;
        font-family: "roc-grotesk-wide",  sans-serif;
        font-weight: 600;
        border: 1px solid;
        border-color: $secondary;
        width: 32px;
        height: 32px;

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
