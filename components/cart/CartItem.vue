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
        <button @click="quantityRef = quantityRef - 1">-</button>
        <input
          class="cart-product-quantity-input"
          @change="(e) => (quantityRef = e.target.value)"
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
  cartId: any;
  quantity: any;
}

const props = defineProps<CartItemProps>();

const quantityRef = ref(props.quantity);
console.log("quantityRef:", quantityRef.value);
console.log("quantityProuct", props.product.quantity);

const updateCart = ({ product, quantity }: any) => {
  const productInfo = {
    id: product.id,
    merchandiseId: product.merchandise.id,
    quantity: parseInt(quantity),
  };

  ShopifyUpdateLineItem({ cartId: props.cartId, product: productInfo });
};

watch(quantityRef, (newQuantity) => {
  updateCart({ product: props.product, quantity: newQuantity });
});
</script>

<style lang="scss">
.cart-product {
  padding: 20px;
  padding-left: 50px;
  padding-right: 50px;
  display: flex;
  gap: 50px;
  justify-content: space-between;
  align-items: center;
  height: 150px;

  .cart-product-image {
    height: 100%;
    width: auto;
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
      }

      input {
        border-right: none;
        border-left: none;
      }
    }
  }
}
</style>
