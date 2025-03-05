<template>
  <div
    role="dialog"
    class="side-menu"
    :class="[`side-menu--${side}`, { active: isOpen }]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface SideMenuProps {
  side: "left" | "right";
  isOpen: boolean;
}

defineProps<SideMenuProps>();
</script>

<style lang="scss">
.side-menu {
  position: fixed;
  top: 0;

  display: flex;
  flex-direction: column;
  gap: 40px;
  height: 100%;
  width: 100%;
  padding: 10px;
  max-width: $cart-max-width;

  color: var(--secondary);
  background: transparent;
  backdrop-filter: $blur--menu;
  z-index: 1000;
  overflow-y: scroll;
  border-right: 1px solid $primary;

  transition: transform 0.5s;

  &.side-menu--left {
    left: 0;
    transform: translateX(-100%);

    border-right: 1px solid $primary;
  }

  &.side-menu--right {
    right: 0;
    transform: translateX(100%);

    border-left: 1px solid $primary;
  }

  &.active {
    transform: translateX(0);
  }
}
</style>
