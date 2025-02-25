import { defineStore } from "pinia";

export const useFilterStore = defineStore("filterStore", {
  state: () => ({
    isActive: false,
    filters: {
      productTypes: [],
      colors: [],
    },
    selectedFilters: {
      productTypes: [],
      colors: [],
    },
  }),

  actions: {
    setAvailableFilters(products: any[]) {
      const filterSet = {
        productTypes: new Set(),
        colors: new Set(),
      };

      products.forEach((product, index) => {
        if (product.node.productType)
          filterSet.productTypes.add(product.node.productType);
        product.node.variants.edges.forEach(({ node }: any) => {
          if (node.selectedOptions) {
            node.selectedOptions.forEach((option: any) => {
              if (option.name.toLowerCase() === "color")
                filterSet.colors.add(option.value);
            });
          }
        });
      });

      this.filters = {
        productTypes: Array.from(filterSet.productTypes),
        colors: Array.from(filterSet.colors),
      };
    },

    updateSelectedFilters(filterType: string, values: string[]) {
      this.selectedFilters[filterType] = values;
    },

    clearFilters() {
      this.selectedFilters = {
        productTypes: [],
        colors: [],
      };
    },
  },
});
