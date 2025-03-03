import { defineStore } from "pinia";
import { ref } from "vue";
import { useNotificationStore } from "@/stores/notificationStore";

interface UpdateCartProps {
  id: string;
  quantity: number;
  title?: string;
}

export const useCartStore = defineStore("cart", () => {
  const cartId = ref<string>();
  const cartActive = ref(false);
  const cart = reactive<any>({
    lines: { edges: [] },
    checkoutUrl: "",
    totalQuantity: "",
  });

  onMounted(() => {
    cartId.value = localStorage.getItem("cartId") || "";
    fetchCart();
  });

  const updateCart = async ({ id, quantity, title }: UpdateCartProps) => {
    const notificationStore = useNotificationStore();

    !localStorage.getItem("cartId") &&
      localStorage.setItem(
        "cartId",
        await ShopifyCreateCart().then((data) => data.cartCreate.cart.id)
      );
    cartId.value = localStorage.getItem("cartId");

    try {
      await ShopifyAddCartItem({
        cartId: cartId.value,
        product: { merchandiseId: id, quantity },
      });

      await fetchCart();

      if (title) {
        notificationStore.addNotification("success", `${title} added to cart!`);
      }

      cartActive.value = true;
    } catch (error) {
      notificationStore.addNotification("error", "Failed to add item to cart.");
      console.error("Cart update error:", error);
    }

    cartActive.value = true;
  };

  const fetchCart = async () => {
    cartId.value !== "" &&
      cartId.value &&
      (await ShopifyGetCart(cartId.value).then((data) => {
        cart.lines.edges = data.cart.lines.edges;
        cart.checkoutUrl = data.cart.checkoutUrl;
        cart.totalQuantity = data.cart.totalQuantity;
      }));
  };

  return { cartId, updateCart, cartActive, cart };
});
