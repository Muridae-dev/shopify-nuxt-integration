<template>
  <div class="cart-product parent text-sm --uppercase">
    <UiProductImage
      :imageSrc="product.merchandise.image.url"
      :imageAlt="`[[ TODO ]]`"
      :imageLink="product.merchandise.product.handle"
    />

    <div class="cart-product-info">
      <NuxtLink
        :to="`/products/${product.merchandise.product.handle}`"
        class="cart-product-title"
        >{{ product.merchandise.product.title }}</NuxtLink
      >
      <span class="cart-product-cost">{{
        `${product.cost.amountPerQuantity.amount} ${product.cost.amountPerQuantity.currencyCode}`
      }}</span>
      <div class="cart-product-quantity">
        <button
          @click="quantityRef = quantityRef - 1"
          :disabled="quantityRef === 0"
        >
          -
        </button>
        <input
          class="cart-product-quantity-input"
          @change="(e) => (quantityRef = (e.target as HTMLInputElement).value)"
          :value="quantityRef"
        />
        <button @click="quantityRef = quantityRef + 1">+</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CartItemProps {
  product: any;
  quantity: any;
}

const props = defineProps<CartItemProps>();

const quantityRef = ref(props.quantity);

const updateCart = ({ product, quantity }: any) => {
  const { cartId } = useCartStore();
  const productInfo = {
    id: product.id,
    merchandiseId: product.merchandise.id,
    quantity: parseInt(quantity),
  };

  ShopifyUpdateLineItem({ cartId, product: productInfo });
};

watch(quantityRef, (newQuantity) => {
  updateCart({ product: props.product, quantity: newQuantity });
});
</script>

<style lang="scss">
.cart-product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;

  height: 150px;

  .cart-product-title {
    color: inherit;
    text-decoration: underline;
  }

  .cart-product-info {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;

    .cart-product-quantity {
      display: inline-flex;
      align-items: center;
      gap: 0px;
      padding-top: 10px;

      button,
      input {
        width: 32px;
        height: 32px;

        background: transparent;
        color: $secondary;
        border: 1px solid;
        border-color: $secondary;

        text-align: center;
        font-family: $base-level-font;

        &[disabled],
        &:disabled {
          background: rgb(242, 242, 242);
          color: rgb(98, 98, 98);
          cursor: not-allowed;
        }
      }

      input {
        border-right: none;
        border-left: none;
      }
    }
  }
}
</style>
