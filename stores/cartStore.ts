import { defineStore } from "pinia";
import { ref } from "vue";

interface UpdateCartProps {
  id: string;
  quantity: number;
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

  const updateCart = async ({ id, quantity }: UpdateCartProps) => {
    !localStorage.getItem("cartId") &&
      localStorage.setItem(
        "cartId",
        await ShopifyCreateCart().then((data) => data.cartCreate.cart.id)
      );
    cartId.value = localStorage.getItem("cartId");

    await ShopifyAddCartItem({
      cartId: cartId.value,
      product: { merchandiseId: id, quantity },
    });

    await fetchCart();

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
