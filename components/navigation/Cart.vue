<template>
  <div class="cart-container" v-if="cart" :class="cartActive && 'active'">
    <button class="cart-close-button --fun" @click="cartActive = !cartActive">
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
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(100%);
  color: $secondary;
  transition: transform 0.5s;
  height: 100%;
  width: 100%;
  max-width: 500px;
  backdrop-filter: $blur--cart;
  z-index: 1000;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 50px;

  border-left: 1px solid $primary;

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

  font-family: $header-title-font;
  font-weight: 400;
  font-size: 2rem;

  &.--fun {
    border: 3px solid $secondary;
    box-shadow: 5px 5px $secondary;
    background: $primary-background;
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
  margin-top: 20px;
  margin-bottom: 40px;

  color: $secondary;
  font-family: "roc-grotesk-wide",  sans-serif;
  font-weight: 600;
}
</style>
