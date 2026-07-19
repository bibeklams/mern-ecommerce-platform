import api from "../api/api";

// ==========================
// Public
// ==========================

export const getAllCategories = async () => {
  const response = await api.get("/category");
  return response.data;
};

export const getSingleCategory = async (id) => {
  const response = await api.get(`/category/${id}`);
  return response.data;
};

// ==========================
// Admin
// ==========================

export const addCategory = async (formData) => {
  const response = await api.post("/category", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateCategory = async ({ id, formData }) => {
  const response = await api.patch(`/category/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/category/${id}`);
  return response.data;
};
