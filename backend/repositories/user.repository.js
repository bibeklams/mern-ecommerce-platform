import User from "../models/User.js";

export const findByEmail = (email) => {
  return User.findOne({ email });
};
export const findOne = (filter) => {
  return User.findOne(filter);
};
export const findUserById = (id) => {
  return User.findById(id);
};
export const createUser = (userData) => {
  return User.create(userData);
};
export const findAllUsers = (filter = {}, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  return User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
};
export const updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};
export const deleteUnverifiedUser = (filter) => {
  return User.deleteOne(filter);
};
export const countUsers = (filter = {}) => {
  return User.countDocuments(filter);
};
