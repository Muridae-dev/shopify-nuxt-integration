<template>
  <div class="cart-product">
    <figure>
      <NuxtLink
        :to="`/products/${product.merchandise.product.handle}`"
        aria-hidden="true"
      ></NuxtLink>
      <img class="cart-product-image" :src="product.merchandise.image.url" />
    </figure>

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
          @change="(e) => (quantityRef = (e.target as HTMLInputElement).value)"
          :value="quantityRef"
        />
        <button @click="quantityRef = quantityRef + 1">+</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;

  height: 150px;

  font-size: 0.8rem;
  line-height: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.02rem;
  text-transform: uppercase;

  .cart-product-title {
    color: inherit;
    text-decoration: underline;
  }

  figure {
    position: relative;

    height: 100%;
    padding: 10px;
    background-color: $card-image-background;

    a {
      position: absolute;
      top: 0;
      left: 0;

      height: 100%;
      width: 100%;
    }

    .cart-product-image {
      height: 100%;
      overflow: hidden;
    }
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
        color: $secondary;
        border: 1px solid;
        border-color: $secondary;

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
