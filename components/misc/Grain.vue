<template>
  <div class="grain-bg"></div>
</template>

<style scoped lang="scss">
.grain-bg {
  position: fixed;
  top: 0;
  z-index: -1;

  height: 100%;
  width: 100%;

  background-image: url("@/assets/images/misc/noise.gif");
  background-size: 300px;
  opacity: calc(10 / 100);
  mix-blend-mode: multiply;
  pointer-events: none;
}
</style>
