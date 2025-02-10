<template>
  <button class="cart-close-button" @click="closeMenu">X</button>
</template>

<script lang="ts">
defineProps<{
  closeMenu?: () => void;
}>();
</script>

<style lang="scss">
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
