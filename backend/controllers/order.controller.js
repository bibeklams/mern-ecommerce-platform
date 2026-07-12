import * as orderRepository from "../repositories/order.repository.js";
import * as cartRepository from "../repositories/cart.repository.js";
import * as productRepository from "../repositories/product.repository.js";
import * as userRepository from "../repositories/user.repository.js";
import { throwError } from "../utils/errorHandler.js";

export const createOrder = async (userId, data) => {
  // Check user
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throwError("User not found.", 404);
  }

  // Get user's cart
  const cartItems = await cartRepository.findByUser(userId);

  if (!cartItems.length) {
    throwError("Cart is empty.", 400);
  }

  const items = [];
  let totalAmount = 0;

  // Validate products & prepare order items
  for (const cartItem of cartItems) {
    const product = await productRepository.findById(cartItem.product);

    if (!product) {
      throwError("Product not found.", 404);
    }

    if (product.status !== "ACTIVE") {
      throwError(`${product.name} is not available.`, 400);
    }

    if (product.stock < cartItem.quantity) {
      throwError(`${product.name} has insufficient stock.`, 400);
    }

    const totalPrice = product.finalPrice * cartItem.quantity;

    items.push({
      product: product._id,
      seller: product.seller,
      name: product.name,
      image: product.images[0],
      price: product.finalPrice,
      quantity: cartItem.quantity,
      totalPrice,
    });

    totalAmount += totalPrice;
  }

  // Create order
  const order = await orderRepository.createOrder({
    user: userId,
    items,
    shippingAddress: data.shippingAddress,
    paymentMethod: data.paymentMethod,
    totalAmount,
  });

  // Reduce stock
  for (const cartItem of cartItems) {
    const product = await productRepository.findById(cartItem.product);

    const updatedData = {
      stock: product.stock - cartItem.quantity,
    };

    if (updatedData.stock === 0) {
      updatedData.status = "OUT_OF_STOCK"; // Use your actual status value
    }

    await productRepository.updateProduct(product._id, updatedData);
  }

  // Clear user's cart
  await cartRepository.clearCart(userId);

  return {
    message: "Order placed successfully.",
    order,
  };
};
