<template>
  <figure class="product-image-container">
    <NuxtLink
      v-if="imageLink"
      :to="`/products/${imageLink}`"
      aria-hidden="true"
    ></NuxtLink>
    <img :alt="imageAlt" :src="imageSrc" />
  </figure>
</template>

<script lang="ts" setup>
interface ProductImageProps {
  imageSrc: string;
  imageAlt: string;
  imageLink?: string;
}

defineProps<ProductImageProps>();
</script>

<style lang="scss">
.product-image-container {
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
  aspect-ratio: 1;
  padding: 5px;
  background-color: $card-image-background;

  img {
    object-fit: contain;
    width: 100%;
  }

  a {
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;
  }
}

.parent:hover {
  .product-image-container {
    background-color: $card-image-background--hover;
  }

  h2 {
    text-decoration: underline;
  }
}
</style>
