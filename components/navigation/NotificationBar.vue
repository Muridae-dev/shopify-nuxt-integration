<template>
  <div
    class="notification-toaster"
    :class="notificationStore.headerHidden && 'hide-header'"
  >
    <div
      class="notification-bar"
      :class="notificationStore.notifications.length > 0 && 'active'"
    >
      <div v-if="notificationStore.notifications[0]">
        {{ notificationStore.notifications[0].message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from "@/stores/notificationStore";

const notificationStore = useNotificationStore();
</script>

<style lang="scss">
.notification-toaster {
  position: fixed;
  top: $header-spacing;
  left: 0;
  z-index: 50;

  height: $notification-bar-height;
  width: 100%;
  overflow: hidden;

  transition: transform 0.5s;

  &.hide-header {
    transform: translateY(-$header-spacing);
  }
}

.notification-bar {
  height: $notification-bar-height;
  width: 100%;
  padding-left: 50px;
  padding-right: 50px;

  transform: translateY(-100%);
  opacity: 1;

  background: green; // TODO this needs to be fixed
  border-bottom: 1px solid $secondary;

  transition: transform 0.5s;

  font-family: "video",  serif;
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
  color: $secondary;
  display: flex;
  align-items: center;

  &.active {
    transform: translateY(0);
    background: green;
  }
}
</style>
