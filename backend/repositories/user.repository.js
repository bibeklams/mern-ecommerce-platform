import User from "../models/User.js";
export const findByEmail = (email) => {
  return User.findOne({ email });
};
export const createUser = (userData) => {
  return User.create({ userData });
};
