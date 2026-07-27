import * as orderRepository from "../repositories/order.repository.js";
import * as cartRepository from "../repositories/cart.repository.js";
import * as productRepository from "../repositories/product.repository.js";
import * as userRepository from "../repositories/user.repository.js";
import * as notificationService from "./notification.service.js";
import { throwError } from "../utils/errorHandler.js";

export const createOrder = async (userId, data) => {
  // ==========================
  // Check User
  // ==========================
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throwError("User not found.", 404);
  }

  // ==========================
  // Get Cart
  // ==========================
  const cartItems = await cartRepository.findByUser(userId);

  if (!cartItems.length) {
    throwError("Cart is empty.", 400);
  }

  const items = [];
  let totalAmount = 0;

  // ==========================
  // Validate Products
  // ==========================
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

  // ==========================
  // Create Order
  // ==========================
  const order = await orderRepository.createOrder({
    user: userId,
    items,
    shippingAddress: data.shippingAddress,
    paymentMethod: data.paymentMethod,
    paymentStatus: "PENDING",
    totalAmount,
  });
  // ==========================
  // Notification
  // ==========================
  await notificationService.createNotification({
    user: userId,
    title: "Order Placed",
    message: "Your order has been placed successfully.",
    type: "ORDER",
  });

  // ==========================
  // Cash On Delivery
  // ==========================
  if (data.paymentMethod === "COD") {
    for (const cartItem of cartItems) {
      const product = await productRepository.findById(cartItem.product);

      const remainingStock = product.stock - cartItem.quantity;

      await productRepository.updateProduct(product._id, {
        stock: remainingStock,
        ...(remainingStock === 0 && {
          status: "OUT_OF_STOCK",
        }),
      });
    }

    // Clear Cart
    await cartRepository.clearCart({
      user: userId,
    });
  }

  // ==========================
  // Response
  // ==========================
  return {
    message: "Order placed successfully.",
    orderId: order._id,
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

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const orders = await orderRepository.findAll(filter, {
    page,
    limit,
  });

  const total = await orderRepository.countOrders(filter);

  return {
    message: "Orders fetched successfully.",
    orders,
    page,
    pages: Math.ceil(total / limit),
    total,
  };
};
export const myOrders = async (userId, query) => {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throwError("User not found.", 404);
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const filter = {
    user: userId,
  };

  const orders = await orderRepository.findAll(filter, {
    page,
    limit,
  });

  const total = await orderRepository.countOrders(filter);

  return {
    message: "Orders fetched successfully.",
    orders,
    page,
    pages: Math.ceil(total / limit),
    total,
  };
};

export const getSellerOrders = async (sellerId, query) => {
  const filter = {
    "items.seller": sellerId,
  };

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const orders = await orderRepository.findAll(filter, {
    page,
    limit,
  });

  const total = await orderRepository.countOrders(filter);

  return {
    message: "Orders fetched successfully.",
    orders,
    page,
    pages: Math.ceil(total / limit),
    total,
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

  // Prevent updating to the same status
  if (order.orderStatus === orderStatus) {
    throwError(`Order is already ${orderStatus}.`, 400);
  }

  // Valid status transitions
  const statusFlow = {
    PENDING: ["PROCESSING", "CANCELLED"],
    PROCESSING: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: [],
  };

  if (!statusFlow[order.orderStatus]?.includes(orderStatus)) {
    throwError("Invalid order status transition.", 400);
  }

  // Update order
  const updatedOrder = await orderRepository.update(orderId, {
    orderStatus,
  });

  // Notification
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

    case "DELIVERED":
      title = "Order Delivered";
      message = `Your order #${order._id} has been delivered.`;
      break;

    case "CANCELLED":
      title = "Order Cancelled";
      message = `Your order #${order._id} has been cancelled.`;
      break;
  }

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
