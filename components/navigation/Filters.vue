<template>
  <dialog
    class="filter-menu"
    role="dialog"
    aria-labelledby="filter-title"
    :class="filterStore.isActive && 'active'"
  >
    <UiCloseButton :closeMenu="() => (filterStore.isActive = false)" />
    <h2 id="filter-title">Filter Products</h2>
    <form>
      <pre>{{ filterStore.filters }}</pre>
      <button>Apply Filters</button>
      <button type="reset">Reset</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { useFilterStore } from "@/stores/filterStore";

const filterStore = useFilterStore();
</script>

<style lang="scss">
.filter-menu {
  all: unset;
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(-100%);

  height: 100%;
  width: 100%;
  padding: 10px;
  max-width: $cart-max-width;
  color: $secondary;
  background: transparent;
  backdrop-filter: $blur--menu;
  z-index: 1000;
  overflow-y: scroll;
  border-right: 1px solid $primary;

  transition: transform 0.5s;

  &.active {
    transform: translateX(0);
  }
}
</style>
