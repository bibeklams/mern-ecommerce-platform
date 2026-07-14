await notificationService.createNotification({
  user: sellerId,
  title: "Seller Approved",
  message: "Congratulations! Your seller account has been approved.",
  type: "SELLER",
});
await notificationService.createNotification({
  user: sellerId,
  title: "New Order",
  message: "You received a new order.",
  type: "ORDER",
});
await notificationService.createNotification({
  user: userId,
  title: "Payment Successful",
  message: "Your payment has been received.",
  type: "PAYMENT",
});
await notificationService.createNotification({
  user: order.user,
  title: "Order Shipped",
  message: "Your order has been shipped.",
  type: "ORDER",
});
