<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <ProductView />
  </div>
</template>

<script setup lang="ts">
// console.log(useNuxtData("products"));
</script>

<style lang="scss">
h1 {
  color: $primary;
}

body {
  background: $primary-background; /* fallback for old browsers */
  font-family: "Courier New", Courier, monospace;
}
</style>
