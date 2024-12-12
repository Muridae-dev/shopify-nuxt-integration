<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// This could be used in line with Store to change title to product name
const description = ref("My amazing site.");

useSeoMeta({
  title: description,
  ogTitle: "SITE TITLE | BRAND NAME",
  description: "This is my amazing site, let me tell you all about it.",
  ogDescription: "This is my amazing site, let me tell you all about it.",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});

import { useHead } from "#imports";

useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://use.typekit.net/vzu1fce.css",
    },
  ],
});
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-weight: normal;
}

body {
  min-height: 100dvh;
  line-height: 1.6;
  background: $primary-background;

  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
}

button {
  cursor: pointer;
}
</style>
