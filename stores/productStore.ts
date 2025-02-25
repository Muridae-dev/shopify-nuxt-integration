import { defineStore } from "pinia";
import { useFilterStore } from "@/stores/filterStore";
import { GetProducts, GetProductsByCollection } from "@/utils/ShopifyClient";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [] as any[],
    collection: null as any | null,
    isLoading: false,
  }),

  actions: {
    async fetchProducts() {
      if (this.products.length > 0 && !this.collection) return;

      this.collection = null;
      this.isLoading = true;

      try {
        const { data } = await useAsyncData("products", async () => {
          const fetchedProducts = await GetProducts();
          return fetchedProducts.products ? fetchedProducts.products.edges : [];
        });

        this.products = data.value || [];
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.isLoading = false;

        const filterStore = useFilterStore();
        filterStore.setAvailableFilters(this.products);
      }
    },

    async fetchProductsByCollection(collectionHandler: string) {
      if (!collectionHandler) return;

      this.isLoading = true;
      try {
        const { data } = await useAsyncData(
          `collection-${collectionHandler}`,
          async () => {
            const fetchedCollection = await GetProductsByCollection(
              collectionHandler
            );
            return fetchedCollection.collection;
          }
        );

        if (data.value) {
          this.collection = data.value;
          this.products = data.value.products.edges || [];
        }
      } catch (error) {
        console.error("Error fetching collection products:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
