<template>
  <Carousel :items-to-show="1">
    <Slide v-for="image in imageArray" :key="image.node.originalSrc">
      <img class="product-carousel-image" :src="image.node.originalSrc" />
    </Slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup lang="ts">
interface ProductCarouselProps {
  imageArray: any[];
}

defineProps<ProductCarouselProps>();
</script>

<style lang="scss">
.carousel {
  text-align: unset;
}

.carousel__track {
  align-items: start;
}

.carousel__prev,
.carousel__next {
  color: white;
  mix-blend-mode: difference;
  margin-left: 0;
  margin-right: 0;

  &:hover {
    color: red;
  }
}

.carousel__pagination-button {
  &:hover {
    &::after {
      background: blue;
    }
  }
  &::after {
    background: $primary;
  }
}

.carousel__pagination-button--active::after {
  background: red;
}

.product-carousel-image {
  width: 100%;
}
</style>
