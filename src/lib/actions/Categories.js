import {
  serverDelete,
  serverFetch,
  serverMutation,
  serverPatch,
} from "../core/server";

export const postCategory = async (categoryData) => {
  return await serverMutation("/api/categories", categoryData);
};

export const getCategories = async (categoryData) => {
  return await serverFetch("/api/categories", categoryData);
};

export const getCategoryById = async (id) => {
  return await serverFetch(`/api/categories/${id}`);
};
export const UpdateCategory = async (id, categoryData) => {
  return await serverPatch(`/api/categories/${id}`, categoryData);
};

export const deleteCategory = async (id) => {
  return await serverDelete(`/api/category/delete/${id}`);
};
