import { defineStore } from "pinia";
import type { FilterTypes } from "~/types/filters";
import type { ShopifyProduct } from "~/types/shopify";

export const useFilterStore = defineStore("filterStore", {
  state: () => ({
    isActive: false,
    filters: {
      productTypes: [] as string[],
      tags: [] as string[],
    },
    selectedFilters: {
      productTypes: [] as string[],
      tags: [] as string[],
    },
  }),

  actions: {
    setAvailableFilters(products: { node: ShopifyProduct }[]) {
      const filterSet = {
        productTypes: new Set<string>(),
        tags: new Set<string>(),
      };

      products.forEach((product) => {
        // ProductType
        if (product.node.productType)
          filterSet.productTypes.add(product.node.productType);

        // Tags
        if (product.node.tags) {
          product.node.tags.forEach((tag) => {
            filterSet.tags.add(tag);
          });
        }
      });

      this.filters = {
        productTypes: Array.from(filterSet.productTypes),
        tags: Array.from(filterSet.tags),
      };
    },

    updateSelectedFilters(filterType: FilterTypes, values: string[]) {
      this.selectedFilters[filterType] = values;
    },

    clearFilters() {
      this.selectedFilters = {
        productTypes: [],
        tags: [],
      };
    },
  },
});
