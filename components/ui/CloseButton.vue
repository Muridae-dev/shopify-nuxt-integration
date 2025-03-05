<template>
  <button class="cart-close-button" @click="closeMenu">X</button>
</template>

<script setup lang="ts">
defineProps<{
  closeMenu?: () => void;
}>();
</script>

<style lang="scss">
.cart-close-button {
  position: absolute;
  top: 5px;
  right: 10px;

  height: 32px;
  width: 32px;
  background: transparent;
  border: none;
  color: var(--secondary);

  font-family: $header-title-font;
  font-weight: 400;
  font-size: 1.5rem;
}
</style>
