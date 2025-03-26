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
