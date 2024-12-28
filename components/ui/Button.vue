<template>
  <component
    :is="href ? (href.startsWith('/') ? defineNuxtLink({}) : 'a') : 'button'"
    :href="href && !href.startsWith('/') ? href : null"
    :to="href && href.startsWith('/') ? href : null"
    :class="['button', `button--${variant}`]"
    @click="href ? null : click()"
    >{{ text }}</component
  >
</template>

<script setup lang="ts">
interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary";
  click?: () => any;
  href?: string;
}

withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
});
</script>

<style scoped lang="scss">
.button {
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100%;
  border: 1px solid;
  justify-self: flex-end;

  font-family: $button-font--primary;
  font-weight: 600;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  &--primary {
    background: transparent;
    color: $secondary;
    border-color: $secondary;

    &:hover {
      background: black;
      color: white;
    }
  }
}
</style>
