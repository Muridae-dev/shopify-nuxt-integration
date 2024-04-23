<template>
  <div class="cart-container" v-if="cart" :class="cartActive && 'active'">
    <button class="cart-close-button --fun" @click="cartActive = !cartActive">
      X
    </button>
    <CartItem
      v-for="{ node: product } in cart.lines.edges"
      v-bind="{ product, cartId }"
    />

    <a class="cart-checkout-button" :href="cart.checkoutUrl">CHECKOUT</a>
  </div>
</template>

<script setup lang="ts">
const cart = ref<any>();

const { cartId, cartActive } = storeToRefs(useCartStore());

watch(cartId, async (newCartId) => {
  cartActive.value = true;
  if (newCartId !== "" && newCartId)
    cart.value = await ShopifyGetCart(newCartId).then((data) => data.cart);
});
</script>

<style lang="scss">
.cart-container {
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(100%);
  color: $secondary;
  transition: transform 0.5s;
  height: 100%;
  width: 100%;
  max-width: 500px;
  background: black;
  z-index: 1000;
  overflow-y: scroll;

  &.active {
    transform: translateX(0);
  }
}

.cart-close-button {
  height: 50px;
  width: 50px;
  background: transparent;
  border: none;
  color: $secondary;
  position: absolute;
  top: 0;
  right: 0;

  font-family: "roc-grotesk",  sans-serif;
  font-weight: 400;
  font-size: 2rem;

  &.--fun {
    border: 3px solid $secondary;
    border-radius: 10px;
    box-shadow: 5px 5px $secondary;
    background: black;
    top: 10px;
    right: 15px;
  }
}

.cart-checkout-button {
  height: 50px;
  width: 50%;
  border: 1px solid;
  border-color: $secondary;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;

  color: $secondary;
  font-family: "roc-grotesk-wide",  sans-serif;
  font-weight: 600;
}
</style>
