import api from "../api/api";

// eSewa Payment
export const initiateEsewaPayment = async (orderId) => {
  const response = await api.post(`/payment/esewa/${orderId}`);
  return response.data;
};

export const verifyEsewaPayment = async (transactionUuid) => {
  const response = await api.get(`/payment/esewa/verify/${transactionUuid}`);
  return response.data;
};
