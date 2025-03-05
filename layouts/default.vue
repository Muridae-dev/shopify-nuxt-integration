<template>
  <div :class="{ homepage: isFrontPage }">
    <NavigationNavHeader />
    <NavigationCart />
    <NavigationNotificationBar />
    <slot />
    <NavigationNavFooter />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "nuxt/app";

const route = useRoute();
const isFrontPage = computed(() => route.path === "/");
</script>

<style lang="scss">
.homepage {
  --secondary: white;
  header {
    transition: border-color 0.5s, transform 0.5s;

    a,
    button {
      transition: color 0.5s;
    }
  }
}
</style>
