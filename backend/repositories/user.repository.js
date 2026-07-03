import User from "../models/User.js";
export const findByEmail = (email) => {
  return User.findOne({ email });
};
export const createUser = (userData) => {
  return User.create({ userData });
};

export const updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, {
    new: true,
  });
};
