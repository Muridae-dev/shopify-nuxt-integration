<template>
  <div
    class="cart-container"
    v-if="cartStore.cart"
    :class="cartStore.cartActive && 'active'"
  >
    <div class="text-sm --uppercase">
      Your cart ({{ cartStore.cart.lines.edges.length }} items)
    </div>
    <UiCloseButton
      :closeMenu="() => (cartStore.cartActive = !cartStore.cartActive)"
    />

    <CartItem
      v-for="{ node: product } in cartStore.cart.lines.edges"
      :key="product.id"
      v-bind="{ product, quantity: product.quantity }"
    />

    <UiButton :href="cartStore.cart.checkoutUrl">CHECKOUT</UiButton>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore();

onMounted(() => cartStore.initializeCart());
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
  color: var(--secondary);
  backdrop-filter: $blur--menu;
  z-index: 1000;
  overflow-y: scroll;
  border-left: 1px solid $primary;

  transition: transform 0.5s;

  &.active {
    transform: translateX(0);
  }
}
</style>
