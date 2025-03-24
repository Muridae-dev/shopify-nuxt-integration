export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  collections: {
    edges: {
      node: {
        title: string;
        handle: string;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        price: {
          amount: string;
          currencyCode: string;
        };
        selectedOptions: {
          name: string;
          value: string;
        }[];
      };
    }[];
  };
  images: {
    edges: {
      node: {
        transformedSrc: string;
        altText: string | null;
      };
    }[];
  };
}

export interface ShopifyCartProduct {
  id: string;
  quantity: number;
  merchandise: {
    __typename: string;
    id: string;
    product: {
      title: string;
      handle: string;
    };
    image?: {
      url: string;
    };
  };
  cost: {
    amountPerQuantity: {
      amount: string;
      currencyCode: string;
    };
  };
}

export type ShopifyCartProductEdges = { node: ShopifyCartProduct }[];
