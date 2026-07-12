import Order from "../models/Order.js";

export const createOrder = (data) => {
  return Order.create(data);
};

export const findById = (id) => {
  return Order.findById(id);
};

export const findOne = (filter) => {
  return Order.findOne(filter);
};

export const findAllOrder = (filter = {}) => {
  return Order.find(filter).sort({ createdAt: -1 });
};

export const update = (id, data) => {
  return Order.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};
