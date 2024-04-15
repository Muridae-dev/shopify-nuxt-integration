const baseDomain = "b799c0-97.myshopify.com";
const apiVersion = "2024-01";
const shopifyToken = "63c9ecc8f9a27ee24ba1dd090c425bca";
const baseURL = `https://${baseDomain}/api/${apiVersion}/graphql`;

export const ShopifyClient = async (query: string) => {
  const response = await $fetch(baseURL, {
    method: "post",
    headers: {
      "X-Shopify-Storefront-Access-Token": shopifyToken,
      "content-Type": "application/graphql",
    },
    body: query,
  });

  return response.data;
};

export const GetProducts = async () => {
  const queryProducts = `query FirstProduct {
    products(first:20) {
            edges {
              node {
                id
                title
                description
                productType
                images(first: 1) {
                  edges {
                    node {
                      altText
                      originalSrc
                    }
                  }
                }
              }
            }
          }
  }`;

  const {
    data: {
      value: {
        products: { edges: products },
      },
    },
    error,
  } = await useAsyncData("products", () => ShopifyClient(queryProducts));

  return products;
};
