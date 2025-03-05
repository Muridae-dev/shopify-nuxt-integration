<template>
  <component
    :is="href ? (href.startsWith('/') ? defineNuxtLink({}) : 'a') : 'button'"
    :to="href?.startsWith('/') ? href : null"
    :href="!href?.startsWith('/') ? href : null"
    :class="['button', `button--${variant}`]"
    @click="href ? null : click ? click() : null"
    ><slot
  /></component>
</template>

<script setup lang="ts">
interface ButtonProps {
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
  position: relative;
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
    color: var(--secondary);
    border-color: var(--secondary);

    &:hover {
      background: black;
      border-color: black;
      color: white;
    }
  }

  &--secondary {
    background: black;
    color: white;
    border-color: var(--secondary);
    width: auto;
    border-radius: 2px;

    &:hover {
      background: white;
      color: black;
    }
  }
}
</style>
