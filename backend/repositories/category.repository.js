import Category from "../models/Category.js";

export const createCategory = (data) => {
  return Category.create(data);
};

export const getSingleCategory = (filter) => {
  return Category.findOne(filter);
};

export const getAllCategory = () => {
  return Category.find();
};

export const updateOne = (id, data) => {
  return Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteOne = (id) => {
  return Category.findByIdAndDelete(id);
};
