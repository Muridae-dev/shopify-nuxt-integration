<template>
  <div class="notification-bar" :class="currentError !== '' && 'active'">
    {{ currentError !== "" && currentError }}
  </div>
</template>

<script setup lang="ts">
const { currentError } = storeToRefs(useErrorStore());
</script>

<style lang="scss">
.notification-bar {
  position: fixed;
  top: $header-spacing;
  z-index: 50;

  height: 50px;
  width: 100%;
  padding-left: 50px;
  padding-right: 50px;

  transform: translateY(-100%);

  background: red;
  // border-bottom: 1px solid $secondary;

  font-family: "video",  serif;
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
  color: $secondary;
  display: flex;
  align-items: center;

  &.active {
    transform: translateY(0);
  }
}
</style>
