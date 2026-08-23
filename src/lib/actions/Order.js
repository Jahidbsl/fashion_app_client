import { serverFetch, serverMutation, serverPatch } from "../core/server";

export const createOrder = async (orderData) => {
  return await serverMutation("/api/orders", orderData);
};

export const getAllOrders = async () => {
  return await serverFetch("/api/orders");
};

export const getUserOrders = async (email) => {
  return await serverFetch(`/api/orders/user?email=${email}`);
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await serverPatch(`/api/orders/${orderId}/status`, { status });
    return res;
  } catch (error) {
    console.error("Failed to update status from server:", error.message);
    return { success: false, error: error.message };
  }
};