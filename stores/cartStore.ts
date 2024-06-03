import { defineStore } from "pinia";
import { ref } from "vue";

interface UpdateCartProps {
  id: string;
  quantity: number;
}

export const useCartStore = defineStore("cart", () => {
  const cartId = ref<string>();
  const cartActive = ref(false);

  onMounted(() => {
    cartId.value = localStorage.getItem("cartId") || "";
  });

  const updateCart = async ({ id, quantity }: UpdateCartProps) => {
    !localStorage.getItem("cartId") &&
      localStorage.setItem(
        "cartId",
        await ShopifyCreateCart().then((data) => data.cartCreate.cart.id)
      );
    cartId.value = localStorage.getItem("cartId");

    // console.log("cartId in store", cartId.value);

    await ShopifyAddCartItem({
      cartId: cartId.value,
      product: { merchandiseId: id, quantity },
    });

    cartActive.value = true;
  };

  return { cartId, updateCart, cartActive };
});
