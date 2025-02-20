<template>
  <dialog class="filter-menu" role="dialog" aria-labelledby="filter-title">
    <button aria-label="Close filters">✖</button>
    <h2 id="filter-title">Filter Products</h2>
    <form>
      <fieldset>
        <legend>Category</legend>
        <label
          ><input type="checkbox" name="category" value="shoes" /> Shoes</label
        >
        <label
          ><input type="checkbox" name="category" value="bags" /> Bags</label
        >
      </fieldset>
      <fieldset>
        <legend>Price Range</legend>
        <input type="range" min="0" max="500" step="10" />
      </fieldset>
      <button type="submit">Apply Filters</button>
      <button type="reset">Reset</button>
    </form>
  </dialog>
</template>

<script setup lang="ts"></script>

<style lang="scss"></style>
