<template>
  <div v-if="!isFrontPage" class="header-spacing" />
  <header
    class="text-header --uppercase"
    :class="{
      'hide-header': notificationStore.headerHidden,
      'is-front-page': isFrontPage,
    }"
    ref="header"
  >
    <NuxtLink class="header-link" to="/">Website Name</NuxtLink>

    <!-- DESKTOP -->
    <nav class="desktop-nav"><NavigationNavLinks /></nav>

    <div class="header-icon-container">
      <button class="header-link header-hamburger" @click="toggleMenu">
        <MiscIconsHamburger />
      </button>
      <button class="header-link" @click="cartActive = !cartActive">
        <MiscIconsCart />
      </button>
    </div>
  </header>

  <!-- MOBILE -->
  <nav
    class="mobile-nav text-md"
    :class="{ active: menuActive }"
    :aria-hidden="!menuActive"
  >
    <UiCloseButton :closeMenu="toggleMenu" />
    <NavigationNavLinks :closeMenu="toggleMenu" />
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";
import { useNotificationStore } from "@/stores/notificationStore";

const route = useRoute();
const isFrontPage = computed(() => route.path === "/");

const { cartActive } = storeToRefs(useCartStore());
const notificationStore = useNotificationStore();
const menuActive = ref(false);
const lastScroll = ref(0);

const toggleMenu = () => {
  menuActive.value = !menuActive.value;
};

const handleScroll = () => {
  const currentScroll = window.scrollY;
  notificationStore.headerHidden = currentScroll > lastScroll.value;
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

  padding: 0px var(--side-spacing);

  backdrop-filter: $blur;
  border-bottom: 1px solid;
  border-color: $secondary;

  position: fixed;
  top: 0;
  transform: translateY(0);
  transition: transform 0.5s;
  display: flex;
  align-items: center;

  &.hide-header {
    transform: translateY(-100%);
  }

  a,
  button {
    color: $secondary;
    padding: 0;

    transition: filter 1s;
  }

  &.is-front-page {
    a,
    button {
      filter: invert(100%);
    }
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
  display: flex;

  @include respond-to(sm) {
    justify-content: center;
    margin-left: auto;
    gap: 20px;
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
    }

    &.active {
      transform: translateX(0);
    }
  }
}
</style>
