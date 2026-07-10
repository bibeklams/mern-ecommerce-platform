import Wishlist from "../models/Wishlist.js";

export const createWishlist = (data) => {
  return Wishlist.create(data);
};
export const findByUserId = (userId) => {
  return Wishlist.find({ user: userId }).populate(
    "product",
    "name price finalPrice images",
  );
};
export const findOne = (filter) => {
  return Wishlist.findOne(filter);
};
export const deleteWishlist = (id) => {
  return Wishlist.findByIdAndDelete(id);
};
export const countWishlist = (filter = {}) => {
  return Wishlist.countDocuments(filter);
};
