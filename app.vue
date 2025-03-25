<template>
  <NuxtLayout>
    <MiscGrain />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useHead } from "#imports";

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

useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
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
</style>
