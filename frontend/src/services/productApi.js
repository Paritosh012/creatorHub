import api from "./api";

 

// All products
export const getAllProducts = () => {
  return api.get("/products");
};

// Product by slug (DETAIL PAGE)
export const getProductBySlug = (slug) => {
  return api.get(`/products/${slug}`);
};
