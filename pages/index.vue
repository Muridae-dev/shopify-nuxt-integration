<template>
  <div>
    <div v-if="metaData" class="front-page--container">
      <div
        v-for="reference in metaData.metaobject.fields[0].references.nodes"
        class="front-page--reference-container"
      >
        <img :src="reference.image.transformedSrc" />
        <div class="front-page--reference-info">
          <span class="text-md --uppercase">{{ reference.title }}</span>
          <span class="text-md">{{ reference.description }}</span>
          <UiButton
            class="front-page--reference-button"
            :href="`/collections/${reference.handle}`"
            >SHOP NOW</UiButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShopifyMetaData } from "~/utils/ShopifyClient";

const metaData = await ShopifyMetaData();
</script>

<style lang="scss">
h1 {
  color: var(--secondary);
}

body {
  font-family: $base-level-font;
}

.front-page--reference-container {
  position: relative;
  height: 100dvh;
  width: 100vw;
  overflow: hidden;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: auto;
    min-height: 100%;
    object-fit: cover;
    z-index: -10;
  }

  .front-page--reference-info {
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .front-page--reference-button {
    max-width: 400px;
  }
}
</style>
