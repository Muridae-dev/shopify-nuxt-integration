export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
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
        id: string;
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

export type ShopifyProductNode = { node: ShopifyProduct }[];

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
      transformedSrc: string;
      altText: string;
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
