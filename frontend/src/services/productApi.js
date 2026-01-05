import api from "./api";

/**
 * CHANGE:
 * - Keep API layer dumb but consistent
 * - No UI logic here
 * - Return raw axios promise (caller decides UX)
 */

// Popular products
export const getPopularProducts = () => {
  return api.get("/products", {
    params: { popular: true },
  });
};

// All products
export const getAllProducts = () => {
  return api.get("/products");
};

// Product by slug (DETAIL PAGE)
export const getProductBySlug = (slug) => {
  if (!slug) {
    throw new Error("Product slug is required");
  }

  return api.get(`/products/${slug}`);
};
