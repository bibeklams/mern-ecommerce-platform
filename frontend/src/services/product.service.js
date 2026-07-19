import api from "../api/api";

// Public
export const getAllProducts = async (params) => {
  const response = await api.get("/product", { params });
  return response.data;
};

export const getSingleProduct = async (id) => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};

// Seller
export const getSellerProducts = async () => {
  const response = await api.get("/product/seller/my-products");
  return response.data;
};

export const addProduct = async (formData) => {
  const response = await api.post("/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateProduct = async ({ id, formData }) => {
  const response = await api.patch(`/product/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/product/${id}`);
  return response.data;
};
