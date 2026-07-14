import axios from "axios";
import * as orderRepository from "../../repositories/order.repository.js";
import { throwError } from "../../utils/errorHandler.js";

export const initiateKhaltiPayment = async (userId, orderId) => {
  // 1. Find Order
  const order = await orderRepository
    .findById(orderId)
    .populate("user", "name email phone");

  if (!order) {
    throwError("Order not found.", 404);
  }

  // 2. Check ownership
  if (order.user._id.toString() !== userId) {
    throwError("Unauthorized.", 403);
  }

  // 3. Check payment method
  if (order.paymentMethod !== "KHALTI") {
    throwError("Invalid payment method.", 400);
  }

  // 4. Already paid?
  if (order.paymentStatus === "PAID") {
    throwError("Order is already paid.", 400);
  }

  // 5. Build Khalti payload
  const payload = {
    return_url: `${process.env.CLIENT_URL}/payment-success`,
    website_url: process.env.CLIENT_URL,

    // Khalti expects amount in paisa
    amount: order.totalAmount * 100,

    purchase_order_id: order._id.toString(),
    purchase_order_name: `ShopVerse Order ${order._id}`,

    customer_info: {
      name: order.user.name,
      email: order.user.email,
      phone: order.user.phone,
    },
  };

  // 6. Call Khalti API
  const response = await axios.post(
    `${process.env.KHALTI_BASE_URL}/api/v2/epayment/initiate/`,
    payload,
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  // 7. Save pidx
  await orderRepository.update(order._id, {
    pidx: response.data.pidx,
  });

  // 8. Return payment url
  return {
    message: "Payment initiated successfully.",
    paymentUrl: response.data.payment_url,
    pidx: response.data.pidx,
  };
};
