import { defineStore } from "pinia";

export interface Notification {
  id: number;
  type: "success" | "error" | "info";
  message: string;
  isHiding: boolean;
  duration?: number;
}

export const useNotificationStore = defineStore("notificationStore", {
  state: () => ({
    notifications: [] as Notification[],
    headerHidden: false,
  }),

  actions: {
    addNotification(
      type: Notification["type"],
      message: string,
      duration = 3000
    ) {
      const id = Date.now();
      this.notifications.push({ id, type, message, isHiding: true, duration });

      if (duration > 0) {
        const notification = this.notifications.find((n) => n.id === id);
        notification && setTimeout(() => (notification.isHiding = false), 10);
        setTimeout(() => this.triggerHideNotification(id), duration);
      }
    },

    triggerHideNotification(id: number) {
      const notification = this.notifications.find((n) => n.id === id);
      if (notification) {
        notification.isHiding = true;
        setTimeout(() => this.removeNotification(id), 500);
      }
    },
    removeNotification(id: number) {
      this.notifications = this.notifications.filter((n) => n.id !== id);
    },
  },
});
