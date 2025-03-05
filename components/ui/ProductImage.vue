<template>
  <figure class="product-image-container">
    <NuxtLink
      v-if="imageLink"
      :to="`/products/${imageLink}`"
      aria-hidden="true"
    ></NuxtLink>
    <img :alt="imageAlt" :src="imageSrc" />
    <img v-if="imageHoverSrc" class="product-image--alt" :src="imageHoverSrc" />
  </figure>
</template>

<script lang="ts" setup>
interface ProductImageProps {
  imageSrc: string;
  imageAlt: string;
  imageHoverSrc?: string | false;
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

  .product-image--alt {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 10px);
    opacity: 0;
    transition: opacity 0.5s;
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

  .product-image--alt {
    opacity: 1;
  }
}
</style>
