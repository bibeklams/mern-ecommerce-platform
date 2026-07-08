import Product from "../models/Product.js";

export const createProduct = (data) => {
  return Product.create(data);
};

export const findById = (id) => {
  return Product.findById(id);
};

export const findOne = (filter) => {
  return Product.findOne(filter);
};

export const findAllProducts = (filter = {}, options = {}) => {
  return Product.find(filter)
    .sort(options.sort || {})
    .skip(options.skip || 0)
    .limit(options.limit || 0);
};

export const updateProduct = (id, data) => {
  return Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteProduct = (id) => {
  return Product.findByIdAndDelete(id);
};
