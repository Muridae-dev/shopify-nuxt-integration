<template>
  <UiSideMenu
    v-if="cartStore.cart"
    :isOpen="cartStore.cartActive"
    side="right"
    :closeMenu="closeCart"
  >
    <div class="text-sm --uppercase">
      Your cart ({{ cartStore.cart.lines.edges.length }} items)
    </div>

    <CartItem
      v-for="{ node } in cartStore.cart.lines.edges"
      :key="node.id + node.quantity"
      v-bind="{ product: node, quantity: node.quantity }"
    />

    <UiButton :href="cartStore.cart.checkoutUrl">CHECKOUT</UiButton>
  </UiSideMenu>
</template>

<script setup lang="ts">
const cartStore = useCartStore();

const closeCart = () => (cartStore.cartActive = false);

onMounted(() => cartStore.initializeCart());
</script>
