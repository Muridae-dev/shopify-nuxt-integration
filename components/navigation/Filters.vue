<template>
  <div
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
        class="filter-type-container"
      >
        <h3 class="text-md --uppercase">{{ filterType }}</h3>
        <label
          class="checkbox-label text-md --uppercase"
          v-for="value in values"
          :key="value"
          :class="{
            '--checked':
              filterStore.selectedFilters[filterType].includes(value),
          }"
        >
          <input
            class="hidden"
            type="checkbox"
            :value="value"
            :checked="filterStore.selectedFilters[filterType].includes(value)"
            @change="toggleFilter(filterType, value)"
          />
          {{ value }}
        </label>
      </div>
      <UiButton
        type="reset"
        class="--uppercase"
        @click="filterStore.clearFilters()"
        >Filters</UiButton
      >
    </form>
  </div>
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

<style lang="scss" scoped>
.filter-menu {
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

.filter-type-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 10px;
}

.checkbox-label {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &::before {
    content: "";
    position: relative;
    display: inline-block;
    height: 32px;
    width: 32px;
    border: 1px solid black;
    background: white;

    box-shadow: inset 0 0 0 0 white; /* No inner box initially */
  }

  &.--checked {
    &::before {
      background: black;
      box-shadow: inset 0 0 0 4px white; /* Expands inward to form the black box */
    }
  }
}

.hidden {
  position: absolute;
  visibility: hidden;
  opacity: 0;
}
</style>
