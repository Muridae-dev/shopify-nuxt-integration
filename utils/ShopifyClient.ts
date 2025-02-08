const baseDomain = "nuxt-build.myshopify.com";
const apiVersion = "2024-04";
const shopifyToken = "b28d17f32049c796a7c47d5281bdd46b";
const baseURL = `https://${baseDomain}/api/${apiVersion}/graphql.json`;

// -------------------- BASE --------------------
// ----------------------------------------------
export const ShopifyClient = async (query: string) => {
  try {
    const response = await $fetch(baseURL, {
      method: "post",
      headers: {
        "X-Shopify-Storefront-Access-Token": shopifyToken,
        "Content-Type": "application/graphql",
      },
      body: query,
    });

    return response.data
      ? { data: response.data }
      : { error: "No data returned from Shopify" };
  } catch (error) {
    console.error("Fetch error:", error);
    return { error: "Failed to fetch data" };
  }
};

export const ShopifyClientJson = async (query: string) => {
  try {
    const response = await $fetch(baseURL, {
      method: "post",
      headers: {
        "X-Shopify-Storefront-Access-Token": shopifyToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: query,
    });

    return response.data ? { data: response.data } : { error: response.errors };
  } catch (error) {
    console.error("Fetch error:", error);
    return { error: "Failed to fetch data" };
  }
};

// -------------------- COLLECTIONS --------------------
// -----------------------------------------------------
export const GetCollections = async () => {
  const queryCollections = `query Collections {
      collections(first: 100) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }`;

  const result = await ShopifyClient(queryCollections);

  if (result.error) {
    console.error("Error fetching products:", result.error);
    return null;
  }

  return result.data;
};

export const GetProductsByCollection = async (collectionHandle: string) => {
  const params = {
    query: `query ProductsByCollection($handle: String!) {
      collection(handle: $handle) {
          id
          title
          products(first: 100) {
            edges {
                node {
                  id
                  handle
                  title
                  description
                  productType
                  collections(first: 2) {
                    edges {
                      node {
                        title
                        handle
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
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
      }
    }`,
    variables: { handle: collectionHandle },
  };

  const result = await ShopifyClientJson(JSON.stringify(params));

  if (result.error) {
    console.error("Error fetching products:", result.error);
    return null;
  }

  return result.data;
};

// -------------------- PRODUCTS -------------------
// -------------------------------------------------
export const GetProducts = async () => {
  const queryProducts = `query FirstProduct {
      products(first:20) {
              edges {
                node {
                  id
                  handle
                  title
                  description
                  productType
                  collections(first: 2) {
                    edges {
                      node {
                        title
                        handle
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
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

  const result = await ShopifyClient(queryProducts);

  if (result.error) {
    console.error("Error fetching products:", result.error);
    return null;
  }

  return result.data;
};

// -------------------- PRODUCT --------------------
// -------------------------------------------------
export const GetProduct = async (productHandler: string) => {
  const params = {
    query: `query SpecificProduct($handle: String!) {
      product(handle: $handle) {
          id
          ... on Product {
                id
                handle
                title
                description
                productType
                tags
                variants(first: 1) {
                  edges {
                    node {
                      id
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
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
    }`,
    variables: { handle: productHandler },
  };

  const result = await ShopifyClientJson(JSON.stringify(params));

  if (result.error) {
    console.error("Error fetching products:", result.error);
    return null;
  }

  return result.data;
};

// -------------------- CART --------------------
// ----------------------------------------------
export const ShopifyCreateCart = async () => {
  const params = `
  mutation {
    cartCreate {
      cart {
        id
      }
    }
  }
`;

  const result = await ShopifyClient(params);

  if (result.error) {
    console.error("Error fetching products:", result.error);
    return null;
  }

  return result.data;
};

export const ShopifyAddCartItem = async ({ cartId, product }: any) => {
  const params = {
    query: `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }`,
    variables: { cartId, lines: [product] },
  };

  const result = await ShopifyClientJson(JSON.stringify(params));

  if (result.error) {
    console.error("Error updating cart: ", result.error);
    return null;
  }

  return result.data;
};

export const ShopifyGetCart = async (cartId: string) => {
  const params = {
    query: `query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        lines(first: 99) {
          edges {
            node {
              id
              quantity
              merchandise {
                __typename
                ... on ProductVariant {
                  id
                  product {
                    title
                    handle
                  }
                  image {
                    url
                  }
                
                }
              }
              cost {
                amountPerQuantity {
                  amount
                  currencyCode
                }
              }
            }
          }
        } 
      }
    }`,
    variables: { cartId },
  };

  const result = await ShopifyClientJson(JSON.stringify(params));

  if (result.error) {
    console.error("Error grabbing cart: ", result.error);
    return null;
  }

  return result.data;
};

export const ShopifyUpdateLineItem = async ({ cartId, product }: any) => {
  const params = {
    query: `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
        userErrors {
          field
          message
        }
      }
    }`,
    variables: { cartId, lines: product },
  };

  const result = await ShopifyClientJson(JSON.stringify(params));

  if (result.error) {
    console.error("Error updating line-item: ", result.error);
    return null;
  }

  return result.data;
};
