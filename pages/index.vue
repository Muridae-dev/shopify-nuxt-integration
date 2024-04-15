<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <NuxtLink to="/about">About page</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const baseDomain = "b799c0-97.myshopify.com";
const apiVersion = "2024-01";
const shopifyToken = "63c9ecc8f9a27ee24ba1dd090c425bca";
const baseURL = `https://${baseDomain}/api/${apiVersion}/graphql`;

const ShopifyClient = async (query: any) => {
  const callData = await $fetch(baseURL, {
    method: "post",
    headers: {
      "X-Shopify-Storefront-Access-Token": shopifyToken,
      "content-Type": "application/graphql",
    },
    body: query,
  });

  console.log(callData);
};

const queryProducts = `query FirstProduct {
  products(first:20) {
          edges {
            node {
              id
              title
              description
              productType
              images(first: 1) {
                edges {
                  node {
                    altText
                    originalSrc
                  }
                }
              }
            }
          }
        }
}`;

ShopifyClient(queryProducts);
</script>

<style lang="scss">
h1 {
  color: $secondary;
}
</style>
