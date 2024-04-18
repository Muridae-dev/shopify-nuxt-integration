<template>
  <div>
    <Hero />
    <ProductCarousel />
  </div>
</template>

<script setup lang="ts">
// console.log(useNuxtData("products"));
</script>

<style lang="scss">
h1 {
  color: $secondary;
}

body {
  background: $primary-background; /* fallback for old browsers */
  font-family: "Montserrat", sans-serif;
}
</style>
