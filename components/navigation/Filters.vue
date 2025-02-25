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
      <div
        v-for="(values, filterType) in filterStore.filters"
        :key="filterType"
      >
        <h3>{{ filterType }}</h3>
        <label v-for="value in values" :key="value">
          <input
            type="checkbox"
            :value="value"
            :checked="filterStore.selectedFilters[filterType].includes(value)"
            @change="toggleFilter(filterType, value)"
          />
          {{ value }}
        </label>
      </div>
      <button>Apply Filters</button>
      <button type="reset">Reset</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { useFilterStore } from "@/stores/filterStore";

const filterStore = useFilterStore();

const toggleFilter = (filterType: string, value: string) => {
  const currentFilters = filterStore.selectedFilters[filterType];
  if (currentFilters.includes(value)) {
    filterStore.updateSelectedFilters(
      filterType,
      currentFilters.filter((v) => v !== value)
    );
  } else {
    filterStore.updateSelectedFilters(filterType, [...currentFilters, value]);
  }
};
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
