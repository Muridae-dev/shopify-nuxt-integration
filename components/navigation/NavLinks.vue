<template>
  <ul class="nav-link-container">
    <li>
      <NuxtLink class="header-link" to="/products">Products</NuxtLink>
    </li>
    <li>
      <NuxtLink class="header-link" to="/about">About</NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss">
.nav-link-container {
  display: flex;
  gap: 20px;
  list-style-type: none;
  padding: 0;

  @include respond-to(sm) {
    flex-direction: column;
    text-align: center;
    gap: 50px;
  }
}
</style>
