import Product from "../models/Product.js";

export const createProduct = (data) => {
  return Product.create(data);
};

export const findById = (id) => {
  return Product.findById(id)
    .populate("seller", "name")
    .populate("category", "name");
};

export const findOne = (filter) => {
  return Product.findOne(filter).populate("category", "name");
};
export const countProducts = (filter = {}) => {
  return Product.countDocuments(filter);
};

export const findAllProducts = (filter = {}, options = {}) => {
  return Product.find(filter)
    .populate("category", "name")
    .sort(options.sort || { createdAt: -1 })
    .skip(options.skip || 0)
    .limit(options.limit || 10);
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
