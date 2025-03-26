<template>
  <div>
    <div
      role="dialog"
      class="side-menu"
      :class="[`side-menu--${side}`, { active: isOpen }]"
    >
      <UiCloseButton :closeMenu />
      <slot />
    </div>
    <div
      class="side-menu--backdrop"
      :class="{ active: isOpen }"
      @click="closeMenu"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
interface SideMenuProps {
  side: "left" | "right";
  isOpen: boolean;
  closeMenu: () => void;
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
  z-index: 1000;

  color: var(--secondary);
  background: transparent;
  backdrop-filter: $blur--menu;
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

.side-menu--backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  z-index: 999;

  pointer-events: none;
  opacity: 0;

  &.active {
    pointer-events: unset;
  }
}
</style>
