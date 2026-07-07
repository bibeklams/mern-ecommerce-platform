import Otp from "../models/Otp.js";

export const createOtp = (data) => {
  return Otp.create(data);
};
export const findOtp = (query) => {
  return Otp.findOne(query);
};
export const deleteOtp = (filter) => {
  return Otp.findOneAndDelete(filter);
};
