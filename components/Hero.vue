<template>
  <div class="hero-container">
    <img src="/stock/hero.png" alt="Descriptive text for SEO" />
    <div class="hero-title-container">
      <h1>MAIN PRODUCT DESCRIPTION</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
// TypeScript script setup remains unchanged
</script>

<style lang="scss">
.hero-container {
  height: calc(100vh - $header-spacing);
  width: 100%;
  position: relative;
  overflow: hidden;
  background: white;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: auto;
    transform: translate(-50%, -50%);
    min-height: 100%;
    object-fit: cover; // This ensures the image covers the space without distorting the aspect ratio
  }
}

.hero-title-container {
  height: 70%;
  width: 100%;
  position: absolute;
  bottom: 0;

  background: transparent;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 100%);

  h1 {
    position: absolute;
    bottom: 100px;
    left: 50px;
  }
}
</style>
