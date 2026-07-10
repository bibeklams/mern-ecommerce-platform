import * as wishlistRepository from "../repositories/wishlist.repository.js";
import * as userRepository from "../repositories/user.repository.js";
import * as productRepository from "../repositories/product.repository.js";
import { throwError } from "../utils/errorHandler.js";

export const createWishlist = async (userId, productId) => {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throwError("User not found", 404);
  }

  const product = await productRepository.findById(productId);

  if (!product) {
    throwError("Product not found", 404);
  }

  const existingWishlist = await wishlistRepository.findOne({
    user: userId,
    product: productId,
  });

  if (existingWishlist) {
    throwError("Product already in wishlist", 400);
  }

  const wishlist = await wishlistRepository.createWishlist({
    user: userId,
    product: productId,
  });

  return {
    message: "Product added to wishlist",
    wishlist,
  };
};

export const findAllWishlist = async (userId) => {
  const wishlist = await wishlistRepository.findByUserId(userId);

  return {
    wishlist,
  };
};
export const deleteWishlist = async (userId, productId) => {
  const wishlist = await wishlistRepository.findOne({
    user: userId,
    product: productId,
  });

  if (!wishlist) {
    throwError("Wishlist item not found", 404);
  }

  await wishlistRepository.deleteWishlist(wishlist._id);

  return {
    message: "Successfully removed from wishlist",
  };
};
export const isWishlisted = async (userId, productId) => {
  const wishlist = await wishlistRepository.findOne({
    user: userId,
    product: productId,
  });

  return {
    isWishlisted: !!wishlist,
  };
};
export const countWishlist = async (userId) => {
  const count = await wishlistRepository.countWishlist({
    user: userId,
  });

  return {
    count,
  };
};
