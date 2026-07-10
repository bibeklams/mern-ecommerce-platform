import Cart from "../models/Cart.js";

export const createCart = (data) => {
  return Cart.create(data);
};

export const getAllCarts = (filter) => {
  return Cart.find(filter)
    .populate("product", "name finalPrice images stock")
    .sort({ createdAt: -1 });
};

export const updateCart = (id, data) => {
  return Cart.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteCart = (filter) => {
  return Cart.deleteOne(filter);
};

export const countCart = (filter = {}) => {
  return Cart.countDocuments(filter);
};

export const findOne = (filter) => {
  return Cart.findOne(filter);
};
export const clearCart = (filter) => {
  return Cart.deleteMany(filter);
};
