<template>
  <div class="cart-container" v-if="cart" :class="cartActive && 'active'">
    <button class="cart-close-button" @click="cartActive = !cartActive">
      X
    </button>
    <CartItem
      v-for="{ node: product } in cart.lines.edges"
      :key="product.id"
      v-bind="{ product, quantity: product.quantity }"
    />

    <UiButton text="CHECKOUT" :href="cart.checkoutUrl" />
  </div>
</template>

<script setup lang="ts">
// But here it's not...
const { cartActive, cart } = storeToRefs(useCartStore());

// Here it's being reactive
watch(cart.value, (newCart) => {
  console.log("newcart", newCart);
});
</script>

<style lang="scss">
.cart-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(100%);

  height: 100%;
  width: 100%;
  padding: 50px;
  max-width: $cart-max-width;
  color: $secondary;
  backdrop-filter: $blur--cart;
  z-index: 1000;
  overflow-y: scroll;
  border-left: 1px solid $primary;

  transition: transform 0.5s;

  &.active {
    transform: translateX(0);
  }

  @include respond-to(xs) {
    padding: 10px;
  }
}

.cart-close-button {
  position: absolute;
  top: 10px;
  right: 10px;

  height: 50px;
  width: 50px;
  background: transparent;
  border: none;
  color: $secondary;
  border: 2px solid black;

  font-family: $header-title-font;
  font-weight: 400;
  font-size: 1.5rem;
}
</style>
