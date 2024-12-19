<template>
  <div>
    Collections:
    {{ route.params }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const product = ref<any>();
const breadcrumb = route.path.split("/");

//   onMounted(async () => {
//     const fetchedProducts = await GetProduct(route.params.id);
//     product.value = fetchedProducts ? fetchedProducts.node : null;
//   });
</script>

<style scoped lang="scss">
.product-container {
  width: 100%;
  max-width: 1440px;
  margin: auto;
  color: $secondary;
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 50px;
  margin-bottom: 50px;

  flex-direction: row;
  flex-wrap: wrap;

  .product-info {
    max-width: 40%;
    display: flex;
    flex-direction: column;
    gap: 30px;

    .product-breadcrumb {
      text-transform: uppercase;
      font-weight: bold;
      order: -1;
    }

    .product-price,
    .product-description {
      display: flex;
      gap: 20px;
      justify-content: space-between;
      text-align: left;
      font-weight: bold;
      text-transform: uppercase;

      span {
        width: 60%;
        font-weight: normal;
        text-transform: none;
      }
    }

    .product-price {
      font-family: $product-price-font;
    }

    .product-description {
      font-family: $product-description-font;
    }

    .product-add-to-cart {
      height: 50px;
      background: transparent;
      color: $secondary;
      border: 1px solid;
      border-color: $secondary;
      justify-self: flex-end;

      font-family: $add-to-cart-font;
      font-weight: 600;

      &:hover {
        background: black;
        color: white;
      }
    }
  }

  .product-image-container {
    width: 50%;
    order: -1;

    img {
      width: 100%;
    }
  }

  h1 {
    color: $secondary;
    padding-bottom: 30px;
    border-bottom: 1px solid;
    border-color: rgba($secondary, 0.5);
    font-family: $product-title-font;
  }
}
</style>
