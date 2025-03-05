<template>
  <UiSideMenu v-if="cartStore.cart" :isOpen="cartStore.cartActive" side="right">
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
  </UiSideMenu>
</template>

<script setup lang="ts">
const cartStore = useCartStore();

onMounted(() => cartStore.initializeCart());
</script>
