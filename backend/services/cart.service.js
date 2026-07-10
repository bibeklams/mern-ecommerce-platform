import * as cartRepository from "../repositories/cart.repository.js";
import * as userRepository from "../repositories/user.repository.js";
import * as productRepository from "../repositories/product.repository.js";
import { throwError } from "../utils/errorHandler.js";

export const addToCart = async (userId, productId) => {
  // Check user
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throwError("User not found", 404);
  }

  // Check user account status
  if (user.status !== "ACTIVE") {
    throwError("Your account is inactive", 403);
  }

  // Check product
  const product = await productRepository.findById(productId);
  if (!product) {
    throwError("Product not found", 404);
  }

  // Check product status
  if (product.status !== "ACTIVE") {
    throwError("Product is not available", 400);
  }

  // Check stock
  if (product.stock < 1) {
    throwError("Product is out of stock", 400);
  }

  // Check if product already exists in cart
  const existingCart = await cartRepository.findOne({
    user: userId,
    product: productId,
  });

  // If already exists, increase quantity
  if (existingCart) {
    // Don't allow quantity to exceed stock
    if (existingCart.quantity >= product.stock) {
      throwError("Not enough stock available", 400);
    }

    const cart = await cartRepository.updateCart(existingCart._id, {
      quantity: existingCart.quantity + 1,
    });

    return {
      message: "Cart quantity updated successfully",
      cart,
    };
  }

  // Create new cart item
  const cart = await cartRepository.createCart({
    user: userId,
    product: productId,
    quantity: 1,
  });

  return {
    message: "Product added to cart successfully",
    cart,
  };
};
export const myCart = async (userId) => {
  const carts = await cartRepository.getAllCarts({
    user: userId,
  });

  return {
    carts,
  };
};
export const updateCart = async (userId, productId, quantity) => {
  // Validate quantity
  if (quantity < 1) {
    throwError("Quantity must be at least 1", 400);
  }

  // Check cart item
  const cart = await cartRepository.findOne({
    user: userId,
    product: productId,
  });

  if (!cart) {
    throwError("Cart item not found", 404);
  }

  // Check product
  const product = await productRepository.findById(productId);

  if (!product) {
    throwError("Product not found", 404);
  }

  // Check stock
  if (quantity > product.stock) {
    throwError("Not enough stock available", 400);
  }

  // Update quantity
  const updatedCart = await cartRepository.updateCart(cart._id, {
    quantity,
  });

  return {
    message: "Cart updated successfully",
    cart: updatedCart,
  };
};
export const deleteCart = async (userId, productId) => {
  const cart = await cartRepository.findOne({
    user: userId,
    product: productId,
  });

  if (!cart) {
    throwError("Cart item not found", 404);
  }

  await cartRepository.deleteCart({
    _id: cart._id,
  });

  return {
    message: "Cart item removed successfully",
  };
};
export const countCart = async (userId) => {
  const count = await cartRepository.countCart(userId);
  return {
    count,
  };
};
export const clearCart = async (userId) => {
  const result = await cartRepository.clearCart({
    user: userId,
  });

  if (result.deletedCount === 0) {
    throwError("Cart is already empty", 404);
  }

  return {
    message: "Cart cleared successfully",
  };
};
