import api from "../api/api";

// Get My Cart
export const getMyCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

// Count Cart
export const countCart = async () => {
  const response = await api.get("/cart/count");
  return response.data;
};

// Add To Cart
export const addToCart = async (productId) => {
  const response = await api.post(`/cart/${productId}`);
  return response.data;
};

// Update Cart
export const updateCart = async ({ productId, quantity }) => {
  const response = await api.patch(`/cart/${productId}`, {
    quantity,
  });

  return response.data;
};

// Delete Cart Item
export const deleteCart = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);
  return response.data;
};

// Clear Cart
export const clearCart = async () => {
  const response = await api.delete("/cart");
  return response.data;
};
