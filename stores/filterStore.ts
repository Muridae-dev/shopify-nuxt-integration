import { defineStore } from "pinia";

export const useFilterStore = defineStore("filterStore", {
  state: () => ({
    isActive: false,
    filters: {
      productTypes: [],
      tags: [],
    },
    selectedFilters: {
      productTypes: [],
      tags: [],
    },
  }),

  actions: {
    setAvailableFilters(products: any[]) {
      const filterSet = {
        productTypes: new Set(),
        tags: new Set(),
      };

      products.forEach((product) => {
        // ProductType
        if (product.node.productType)
          filterSet.productTypes.add(product.node.productType);

        // Tags
        if (product.node.tags) {
          product.node.tags.forEach((tag: any) => {
            filterSet.tags.add(tag);
          });
        }
      });

      console.log(filterSet.tags);

      this.filters = {
        productTypes: Array.from(filterSet.productTypes),
        tags: Array.from(filterSet.tags),
      };
    },

    updateSelectedFilters(filterType: string, values: string[]) {
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
