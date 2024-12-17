<template>
  <div class="grain-bg"></div>
  <div class="grain-helper"></div>
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

.grain-helper {
  position: fixed;
  z-index: -6;

  height: 100%;
  width: 100%;

  background: rgb(224, 15, 196);
  background: var(--primary-background-color);
  transition: background 1s;
  opacity: 1;
  filter: contrast(120%);
}
</style>
