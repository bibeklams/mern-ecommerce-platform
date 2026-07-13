import Review from "../models/Review.js";

export const createReview = (data) => {
  return Review.create(data);
};

export const findById = (id) => {
  return Review.findById(id);
};

export const findOne = (filter) => {
  return Review.findOne(filter);
};

export const findAll = (filter = {}) => {
  return Review.find(filter)
    .populate("user", "name imageUrl")
    .sort({ createdAt: -1 });
};

export const updateReview = (id, data) => {
  return Review.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteReview = (id) => {
  return Review.findByIdAndDelete(id);
};

export const count = (filter) => {
  return Review.countDocuments(filter);
};
