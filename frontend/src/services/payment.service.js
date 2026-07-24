import api from "../api/api";

// Initiate eSewa Payment
export const initiateEsewaPayment = async (orderId) => {
  const response = await api.post("/payment/esewa/initiate", {
    orderId,
  });

  return response.data;
};

// Verify eSewa Payment
export const verifyEsewaPayment = async (transactionUuid) => {
  const response = await api.post("/payment/esewa/verify", {
    transactionUuid,
  });

  return response.data;
};
