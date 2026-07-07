import User from "../models/User.js";

export const findByEmail = (email) => {
  return User.findOne({ email });
};
export const findUserById = (id) => {
  return User.findById(id);
};
export const createUser = (userData) => {
  return User.create(userData);
};
export const findAllUsers = (filter = {}) => {
  return User.find(filter);
};
export const updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, {
    new: true,
  });
};
export const deleteUnverifiedUser = (filter) => {
  return User.deleteOne(filter);
};
