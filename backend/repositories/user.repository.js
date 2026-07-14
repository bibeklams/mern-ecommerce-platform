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
export const findAllUsers = (filter = {}) => {
  return User.find(filter).sort({ name: 1 });
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
