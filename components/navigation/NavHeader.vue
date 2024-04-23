<template>
  <div class="header-spacing" />
  <header>
    <div class="header-icon-container">
      <NuxtLink class="header-link" to="/">WEBSITE NAME</NuxtLink>
    </div>
    <ul class="header-link-container">
      <li>
        <NuxtLink class="header-link" to="/products">Products</NuxtLink>
      </li>
      <li>
        <NuxtLink class="header-link" to="/about">About</NuxtLink>
      </li>
      <li>
        <button class="header-link" @click="cartActive = !cartActive">
          CART
        </button>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";

const { cartActive } = storeToRefs(useCartStore());
</script>

<style lang="scss">
.header-spacing {
  display: block;
  padding-bottom: $header-spacing;
}

header {
  height: $header-spacing;
  width: 100%;
  z-index: 99;

  padding-left: 50px;
  padding-right: 50px;

  background: black;
  border-bottom: 1px solid;
  border-color: $secondary;

  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a,
  button {
    color: white;
    text-decoration: none;

    font-family: "roc-grotesk-wide",  sans-serif;
    font-weight: 600;

    text-transform: uppercase;
  }

  button {
    background: transparent;
    font-size: 1.2rem;
    border: none;
  }
}

.header-icon-container {
  height: calc($header-spacing * 0.8);
  width: auto;
  color: $secondary;

  display: flex;
  align-items: center;
  font-size: 1.2rem;
}

.header-link-container {
  display: flex;
  gap: 20px;
  list-style-type: none;

  li {
    font-size: 1.2rem;
  }
}
</style>
