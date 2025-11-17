import api from "./api";

export const getPopularProducts = () => {
  return api.get("/products?popular=true");
};

export const getAllProducts = () => {
  return api.get("/products");
};

export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

export const getCategory = () => {
  return api.get(`/products/category${id}`);
};
