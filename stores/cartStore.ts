import { defineStore } from "pinia";
import { useNotificationStore } from "@/stores/notificationStore";

interface UpdateCartProps {
  id: string;
  quantity: number;
  title?: string;
}

import { useCookie } from "#app";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartId: useCookie("cartId").value || null, // ✅ Uses cookie instead of localStorage
    cartActive: false,
    cart: {
      lines: { edges: [] },
      checkoutUrl: "",
      totalQuantity: "",
    },
  }),

  actions: {
    async fetchCart() {
      if (!this.cartId) return;

      try {
        const data = await ShopifyGetCart(this.cartId);
        this.cart = {
          lines: { edges: data.cart.lines.edges },
          checkoutUrl: data.cart.checkoutUrl,
          totalQuantity: data.cart.totalQuantity,
        };
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    },

    async initializeCart() {
      if (this.cartId) {
        this.fetchCart();
      }
    },

    async updateCart({ id, quantity, title }: UpdateCartProps) {
      const notificationStore = useNotificationStore();
      const cartCookie = useCookie("cartId"); // ✅ Get cookie reference

      if (!this.cartId) {
        try {
          const data = await ShopifyCreateCart();
          this.cartId = data.cartCreate.cart.id;
          cartCookie.value = this.cartId; // ✅ Set cookie
        } catch (error) {
          console.error("Error creating cart:", error);
          return;
        }
      }

      try {
        await ShopifyAddCartItem({
          cartId: this.cartId,
          product: { merchandiseId: id, quantity },
        });

        await this.fetchCart();

        if (title) {
          notificationStore.addNotification(
            "success",
            `${title} added to cart!`
          );
        }

        this.cartActive = true;
      } catch (error) {
        notificationStore.addNotification(
          "error",
          "Failed to add item to cart."
        );
        console.error("Cart update error:", error);
      }
    },
  },
});
