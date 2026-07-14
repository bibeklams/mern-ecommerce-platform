import axios from "axios";
import crypto from "crypto";
import * as orderRepository from "../../repositories/order.repository.js";
import * as productRepository from "../../repositories/product.repository.js";
import * as cartRepository from "../../repositories/cart.repository.js";
import { throwError } from "../../utils/errorHandler.js";

export const initiateEsewaPayment = async (userId, orderId) => {
  // 1. Find order
  const order = await orderRepository.findById(orderId);

  if (!order) {
    throwError("Order not found.", 404);
  }

  // 2. Check ownership
  if (order.user.toString() !== userId) {
    throwError("Unauthorized.", 403);
  }

  // 3. Check payment method
  if (order.paymentMethod !== "ESEWA") {
    throwError("Invalid payment method.", 400);
  }

  // 4. Check already paid
  if (order.paymentStatus === "PAID") {
    throwError("Order is already paid.", 400);
  }

  // 5. Generate transaction uuid
  const transaction_uuid = order._id.toString();

  // 6. Save transaction uuid
  await orderRepository.update(order._id, {
    transactionId: transaction_uuid,
  });

  // 7. Amounts
  const amount = order.totalAmount;
  const tax_amount = 0;
  const product_service_charge = 0;
  const product_delivery_charge = 0;

  const total_amount =
    amount + tax_amount + product_service_charge + product_delivery_charge;

  // 8. Create message for signature
  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE}`;

  // 9. Generate signature
  const signature = crypto
    .createHmac("sha256", process.env.ESEWA_SECRET_KEY)
    .update(message)
    .digest("base64");

  // 10. Return payment data
  return {
    amount,
    tax_amount,
    product_service_charge,
    product_delivery_charge,
    total_amount,

    transaction_uuid,

    product_code: process.env.ESEWA_PRODUCT_CODE,

    success_url: `${process.env.CLIENT_URL}/payment-success`,
    failure_url: `${process.env.CLIENT_URL}/payment-failed`,

    signed_field_names: "total_amount,transaction_uuid,product_code",

    signature,

    payment_url: `${process.env.ESEWA_BASE_URL}/api/epay/main/v2/form`,
  };
};

export const verifyEsewaPayment = async (userId, transactionUuid) => {
  // 1. Find order
  const order = await orderRepository.findOne({
    transactionUuid,
  });

  if (!order) {
    throwError("Order not found.", 404);
  }

  // 2. Check ownership
  if (order.user.toString() !== userId) {
    throwError("Unauthorized.", 403);
  }

  // 3. Already verified
  if (order.paymentStatus === "PAID") {
    return {
      message: "Payment already verified.",
      order,
    };
  }

  let response;

  try {
    // 4. Verify payment with eSewa
    response = await axios.get(
      `${process.env.ESEWA_BASE_URL}/api/epay/transaction/status/`,
      {
        params: {
          product_code: process.env.ESEWA_PRODUCT_CODE,
          total_amount: order.totalAmount,
          transaction_uuid: transactionUuid,
        },
      },
    );
  } catch (error) {
    throwError("Unable to verify payment with eSewa.", 500);
  }

  // 5. Check payment status
  if (response.data.status !== "COMPLETE") {
    throwError(`Payment status: ${response.data.status}`, 400);
  }

  // 6. Verify amount
  if (Number(response.data.total_amount) !== Number(order.totalAmount)) {
    throwError("Payment amount mismatch.", 400);
  }

  // 7. Update order
  await orderRepository.update(order._id, {
    paymentStatus: "PAID",
    transactionId: response.data.ref_id,
    paidAt: new Date(),
  });

  // 8. Reduce stock
  for (const item of order.items) {
    const product = await productRepository.findById(item.product);

    if (!product) {
      continue;
    }

    const remainingStock = Math.max(0, product.stock - item.quantity);

    await productRepository.updateProduct(product._id, {
      stock: remainingStock,
      ...(remainingStock === 0 && {
        status: "OUT_OF_STOCK",
      }),
    });
  }

  // 9. Clear cart
  await cartRepository.clearCart({
    user: userId,
  });

  return {
    message: "Payment verified successfully.",
    orderId: order._id,
    paymentStatus: "PAID",
    transactionId: response.data.ref_id,
  };
};
