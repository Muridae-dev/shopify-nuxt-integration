import { defineStore } from "pinia";

export interface Notification {
  id: number;
  type: "success" | "error" | "info";
  message: string;
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
      this.notifications.push({ id, type, message, duration });

      if (duration > 0) {
        setTimeout(() => this.removeNotification(id), duration);
      }
    },

    removeNotification(id: number) {
      this.notifications = this.notifications.filter((n) => n.id !== id);
    },
  },
});
