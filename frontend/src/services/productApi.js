import api from "./api";

// Popular products
export const getPopularProducts = () => {
  return api.get("/products?popular=true");
};

// All products
export const getAllProducts = () => {
  return api.get("/products");
};

// Product by slug (DETAIL PAGE)
export const getProductBySlug = (slug) => {
  return api.get(`/products/${slug}`);
};
