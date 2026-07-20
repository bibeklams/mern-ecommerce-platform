import api from "../api/api";

export const addToWishlist = async (productId) => {
  const response = await api.post(`/wishlist/${productId}`);
  return response.data;
};

export const getMyWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data;
};

export const removeFromWishlist = async (productId) => {
  const response = await api.delete(`/wishlist/${productId}`);
  return response.data;
};

export const isWishlisted = async (productId) => {
  const response = await api.get(`/wishlist/${productId}`);
  return response.data;
};

export const countWishlist = async () => {
  const response = await api.get("/wishlist/count");
  return response.data;
};
