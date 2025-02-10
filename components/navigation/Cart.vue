<template>
  <div class="cart-container" v-if="cart" :class="cartActive && 'active'">
    <div class="cart-header">
      Your cart ({{ cart.lines.edges.length }} items)
    </div>
    <UiCloseButton :closeMenu="() => (cartActive = !cartActive)" />

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
  padding: 10px;
  max-width: $cart-max-width;
  color: $secondary;
  backdrop-filter: $blur--menu;
  z-index: 1000;
  overflow-y: scroll;
  border-left: 1px solid $primary;

  transition: transform 0.5s;

  &.active {
    transform: translateX(0);
  }
}

.cart-header {
  font-size: 0.8rem;
  line-height: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.02rem;
  text-transform: uppercase;
}
</style>
