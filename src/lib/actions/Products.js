import { serverDelete, serverFetch, serverMutation, serverPatch } from "../core/server";

export const postProduct = async (productData) => {
  return await serverMutation("/api/products", productData);
};

export const getProducts = async (productData = {}) => {
  const queryParams = new URLSearchParams();
  
  const payload = { limit: 10, ...productData };

  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value);
    }
  }
  
  const queryString = queryParams.toString();
  const endpoint = queryString
    ? `/api/products?${queryString}`
    : "/api/products";
    
  return await serverFetch(endpoint);
};

export const getCategories = async () => {
  return await serverFetch("/api/categories");
};

export const getProductById = async (id) => {
  return await serverFetch(`/api/products/${id}`);
};
export const UpdateProduct = async (id, productData) => {
  return await serverPatch(`/api/products/${id}`, productData);
};

export const deleteProduct = async (id) => {
  return await serverDelete(`/api/product/delete/${id}`);
};