<template>
  <UiSideMenu
    v-if="cartStore.cart"
    :isOpen="cartStore.cartActive"
    side="right"
    :close="closeCart"
  >
    <div class="text-sm --uppercase">
      Your cart ({{ cartStore.cart.lines.edges.length }} items)
    </div>

    <CartItem
      v-for="{ node: product } in cartStore.cart.lines.edges"
      :key="product.id"
      v-bind="{ product, quantity: product.quantity }"
    />

    <UiButton :href="cartStore.cart.checkoutUrl">CHECKOUT</UiButton>
  </UiSideMenu>
</template>

<script setup lang="ts">
const cartStore = useCartStore();

const closeCart = () => (cartStore.cartActive = false);

onMounted(() => cartStore.initializeCart());
</script>
