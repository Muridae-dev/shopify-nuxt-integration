<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <NuxtLink to="/about">About page</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { GetProducts } from "@/utils/ShopifyClient";

const products = await GetProducts();

// console.log(useNuxtData("products"));
</script>

<style lang="scss">
h1 {
  color: $secondary;
}
</style>
