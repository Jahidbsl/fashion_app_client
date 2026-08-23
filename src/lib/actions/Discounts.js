import {
  serverDelete,
  serverFetch,
  serverMutation,
  serverPatch,
} from "../core/server";

export const postDiscount = async (discountData) => {
  return await serverMutation("/api/discounts", discountData);
};

export const getDiscounts = async () => {
  return await serverFetch("/api/discounts");
};

export const getDiscountById = async (id) => {
  return await serverFetch(`/api/discounts/${id}`);
};

export const updateDiscount = async (id, discountData) => {
  return await serverPatch(`/api/discounts/${id}`, discountData);
};

export const deleteDiscount = async (id) => {
  return await serverDelete(`/api/discounts/${id}`);
};