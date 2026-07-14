import * as orderRepository from "../repositories/order.repository.js";
import * as cartRepository from "../repositories/cart.repository.js";
import * as productRepository from "../repositories/product.repository.js";
import * as userRepository from "../repositories/user.repository.js";
import * as notificationService from "./notification.service.js";
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
    paymentStatus: "PENDING",
    totalAmount,
  });
  await notificationService.createNotification({
    user: userId,
    title: "Order Placed",
    message: "Your order has been placed successfully.",
    type: "ORDER",
  });
  // Only for Cash on Delivery
  if (data.paymentMethod === "COD") {
    // Reduce stock
    for (const cartItem of cartItems) {
      const product = await productRepository.findById(cartItem.product);

      const updatedData = {
        stock: product.stock - cartItem.quantity,
      };

      if (updatedData.stock === 0) {
        updatedData.status = "OUT_OF_STOCK"; // Or whatever status your model uses
      }

      await productRepository.updateProduct(product._id, updatedData);
    }

    // Clear cart
    await cartRepository.clearCart({
      user: userId,
    });
  }

  return {
    message: "Order placed successfully.",
    order,
  };
};

export const getAllOrders = async (query) => {
  const filter = {};

  if (query.paymentStatus) {
    filter.paymentStatus = query.paymentStatus;
  }

  if (query.orderStatus) {
    filter.orderStatus = query.orderStatus;
  }

  const orders = await orderRepository.findAll(filter);

  return {
    message: "Orders fetched successfully.",
    orders,
  };
};

export const myOrders = async (userId) => {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throwError("No user found.", 404);
  }

  const orders = await orderRepository.findAll({ user: userId });

  return {
    message: "Orders fetched successfully.",
    orders,
  };
};

export const getSellerOrders = async (sellerId, query) => {
  const filter = {
    "items.seller": sellerId,
  };

  if (query.paymentStatus) {
    filter.paymentStatus = query.paymentStatus;
  }

  if (query.orderStatus) {
    filter.orderStatus = query.orderStatus;
  }

  const orders = await orderRepository.findAll(filter);

  return {
    message: "Orders fetched successfully.",
    orders,
  };
};

export const cancelOrder = async (userId, orderId) => {
  // Check user
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throwError("User not found.", 404);
  }

  // Check order
  const order = await orderRepository.findById(orderId);

  if (!order) {
    throwError("Order not found.", 404);
  }

  // Check ownership
  if (order.user.toString() !== userId) {
    throwError("Unauthorized.", 403);
  }

  // Already cancelled
  if (order.orderStatus === "CANCELLED") {
    throwError("Order is already cancelled.", 400);
  }

  // Cannot cancel after shipping
  if (order.orderStatus === "SHIPPED" || order.orderStatus === "DELIVERED") {
    throwError("Order cannot be cancelled.", 400);
  }

  // Restore stock
  for (const item of order.items) {
    const product = await productRepository.findById(item.product);

    if (!product) continue;

    await productRepository.updateProduct(product._id, {
      stock: product.stock + item.quantity,
      status: "ACTIVE", // Use your product status value
    });
  }

  // Cancel order
  const cancelledOrder = await orderRepository.update(orderId, {
    orderStatus: "CANCELLED",
  });
  for (const item of order.items) {
    await notificationService.createNotification({
      user: item.seller,
      title: "Order Cancelled",
      message: `Order #${order._id} has been cancelled by the customer.`,
      type: "ORDER",
    });
  }
  return {
    message: "Order cancelled successfully.",
    order: cancelledOrder,
  };
};

export const getSingleOrder = async (userId, orderId) => {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throwError("User not found.", 404);
  }

  const order = await orderRepository.findById(orderId);

  if (!order) {
    throwError("Order not found.", 404);
  }

  if (order.user.toString() !== userId) {
    throwError("Unauthorized.", 403);
  }

  return {
    message: "Order fetched successfully.",
    order,
  };
};

export const sellerUpdateOrderStatus = async (
  sellerId,
  orderId,
  orderStatus,
) => {
  // Find order
  const order = await orderRepository.findById(orderId);

  if (!order) {
    throwError("Order not found.", 404);
  }

  // Check seller owns at least one item
  const sellerItem = order.items.find(
    (item) => item.seller.toString() === sellerId,
  );

  if (!sellerItem) {
    throwError("Unauthorized.", 403);
  }

  // Allowed statuses
  const allowedStatuses = ["PROCESSING", "SHIPPED"];

  if (!allowedStatuses.includes(orderStatus)) {
    throwError("Invalid order status.", 400);
  }

  // Prevent updating to the same status
  if (order.orderStatus === orderStatus) {
    throwError(`Order is already ${orderStatus}.`, 400);
  }

  // Update order
  const updatedOrder = await orderRepository.update(orderId, {
    orderStatus,
  });

  // Notification message
  let title = "";
  let message = "";

  switch (orderStatus) {
    case "PROCESSING":
      title = "Order Processing";
      message = `Your order #${order._id} is now being processed.`;
      break;

    case "SHIPPED":
      title = "Order Shipped";
      message = `Your order #${order._id} has been shipped.`;
      break;
  }

  // Notify user
  await notificationService.createNotification({
    user: order.user,
    title,
    message,
    type: "ORDER",
  });

  return {
    message: "Order status updated successfully.",
    order: updatedOrder,
  };
};
export const adminUpdateOrderStatus = async (orderId, orderStatus) => {
  const order = await orderRepository.findById(orderId);

  if (!order) {
    throwError("Order not found.", 404);
  }

  const updatedOrder = await orderRepository.update(orderId, {
    orderStatus,
  });

  return {
    message: "Order status updated successfully.",
    order: updatedOrder,
  };
};
export const updatePaymentStatus = async (orderId, paymentStatus) => {
  const order = await orderRepository.findById(orderId);

  if (!order) {
    throwError("Order not found.", 404);
  }

  const updatedOrder = await orderRepository.update(orderId, {
    paymentStatus,
  });

  return {
    message: "Payment status updated successfully.",
    order: updatedOrder,
  };
};
