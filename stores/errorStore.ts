import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore("errors", () => {
  const currentError = ref<any>("");

  return { currentError };
});
