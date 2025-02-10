<template>
  <div class="header-spacing" />
  <header :class="{ 'hide-header': isScrollingDown }" ref="header">
    <NuxtLink class="header-link" to="/">WEBSITE NAME</NuxtLink>

    <!-- DESKTOP -->
    <nav class="desktop-nav"><NavigationNavLinks /></nav>

    <div class="header-icon-container">
      <button class="header-link header-hamburger" @click="toggleMenu">
        <MiscIconsHamburger />
      </button>
      <button class="header-link header-cart" @click="cartActive = !cartActive">
        <MiscIconsCart />
      </button>
    </div>
  </header>

  <!-- MOBILE -->
  <nav
    class="mobile-nav"
    :class="{ active: menuActive }"
    :aria-hidden="!menuActive"
  >
    <UiCloseButton :closeMenu="toggleMenu" />
    <NavigationNavLinks :closeMenu="toggleMenu" />
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";

const { cartActive } = storeToRefs(useCartStore());
const menuActive = ref(false);
const isScrollingDown = ref(false);
const lastScroll = ref(0);

const toggleMenu = () => {
  menuActive.value = !menuActive.value;
};

const handleScroll = () => {
  const currentScroll = window.scrollY;
  isScrollingDown.value = currentScroll > lastScroll.value;
  lastScroll.value = currentScroll;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
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

  backdrop-filter: $blur;
  border-bottom: 1px solid;
  border-color: $secondary;

  position: fixed;
  top: 0;
  transform: translateY(0);
  transition: transform 0.5s;
  display: flex;
  align-items: center;

  letter-spacing: -0.05em;

  @include respond-to(sm) {
    padding-left: 10px;
    padding-right: 10px;
  }

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
  }
}

.desktop-nav {
  margin-left: auto;

  @include respond-to(sm) {
    display: none;
  }
}

.header-icon-container {
  padding-left: 20px;

  @include respond-to(sm) {
    display: flex;
    justify-content: center;
    margin-left: auto;
  }
}

.header-hamburger {
  display: none;

  @include respond-to(sm) {
    display: flex;
    align-items: center;
  }
}

// MOBILE
.mobile-nav {
  display: none;

  @include respond-to(sm) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(25px);
    z-index: 9999;
    transition: transform 0.5s;

    a {
      color: inherit;
      text-transform: uppercase;
    }

    &.active {
      transform: translateX(0);
    }
  }
}
</style>
