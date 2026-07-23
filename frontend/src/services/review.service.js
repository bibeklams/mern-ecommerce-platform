import api from "../api/api";

export const createReview = async (productId, data) => {
  const response = await api.post(`/review/${productId}`, data);
  return response.data;
};

export const getProductReviews = async (productId) => {
  const response = await api.get(`/review/${productId}`);
  return response.data;
};
export const getSellerReviews = async () => {
  const response = await api.get("/review/seller");
  return response.data;
};
export const updateReview = async (reviewId, data) => {
  const response = await api.patch(`/review/${reviewId}`, data);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await api.delete(`/review/${reviewId}`);
  return response.data;
};
