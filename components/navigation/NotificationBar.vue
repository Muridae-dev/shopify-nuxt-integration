<template>
  <div
    class="notification-toaster"
    :class="notificationStore.headerHidden && 'hide-header'"
  >
    <div
      v-for="notification in notificationStore.notifications"
      :key="notification.id"
      class="notification-bar text-sm"
      :class="[{ active: !notification.isHiding }, `--${notification.type}`]"
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

  height: calc(100vh - ($header-spacing));
  width: 100%;
  overflow: hidden;
  pointer-events: none;

  transition: transform 0.5s;

  &.hide-header {
    transform: translateY(-$header-spacing);
  }
}

.notification-bar {
  height: $notification-bar-height;
  width: 100%;
  padding: 0 $side-spacing;

  transform: translateY(-100%);
  opacity: 1;

  border-bottom: 1px solid $secondary;

  transition: transform 0.5s;

  display: flex;
  align-items: center;

  &.--success {
    background: $notification-bar-success-color;
  }

  &.--error {
    background: $notification-bar-error-color;
  }

  &.--info {
    background: $notification-bar-info-color;
  }

  &.active {
    transform: translateY(0);
  }
}
</style>
