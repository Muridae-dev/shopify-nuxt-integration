<template>
  <div class="header-spacing" />
  <header :class="{ 'hide-header': isScrollingDown }" ref="header">
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
    </ul>

    <button class="header-link header-cart" @click="cartActive = !cartActive">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        width="28"
        height="28"
      >
        <!-- Bag body outline -->
        <rect x="6" y="8" width="12" height="12" />

        <!-- Handle -->
        <path d="M8 8a4 4 0 0 1 8 0" />
      </svg>
    </button>
  </header>
</template>
x
<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";

const { cartActive } = storeToRefs(useCartStore());

// State for tracking scroll position
const lastScroll = ref(0);
const isScrollingDown = ref(false);
const header = ref<HTMLDivElement | null>(null);

const handleScroll = () => {
  if (header.value) {
    const headerHeight = header.value.clientHeight;

    const currentScroll = window.scrollY;
    isScrollingDown.value =
      currentScroll > lastScroll.value && currentScroll > headerHeight;

    lastScroll.value = currentScroll;
  }
};

// Mounting and unmounting event listeners
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
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

  background: $primary-background;
  border-bottom: 1px solid;
  border-color: $secondary;

  position: fixed;
  top: 0;
  transform: translateY(0);
  transition: transform 0.5s;
  display: flex;
  align-items: center;

  letter-spacing: -0.05em;

  &.hide-header {
    transform: translateY(-100%);
  }

  a,
  button {
    color: $secondary;
    text-decoration: none;

    font-family: $header-title-font;
    font-weight: 500;

    text-transform: uppercase;
  }

  button {
    background: transparent;
    border: none;
    justify-self: flex-end;
  }
}

.header-icon-container {
  height: calc($header-spacing * 0.8);
  width: auto;
  color: $secondary;

  display: flex;
  align-items: center;
}

.header-cart {
  padding-left: 20px;
}

.header-link-container {
  display: flex;
  gap: 20px;
  list-style-type: none;
  margin-left: auto;
}
</style>
