import * as orderService from "../services/order.service.js";

export const createOrder = async (req, res, next) => {
  try {
    const result = await orderService.createOrder(req.user.id, req.body);
    res.status(201).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllOrders = async (req, res, next) => {
  try {
    const result = await orderService.getAllOrders(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const myOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await orderService.myOrders(userId);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const result = await orderService.cancelOrder(
      req.user.id,
      req.params.orderId,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const getSingleOrder = async (req, res, next) => {
  try {
    const result = await orderService.getSingleOrder(
      req.user.id,
      req.params.orderId,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const getSellerOrders = async (req, res, next) => {
  try {
    const sellerId = req.user.id;

    const result = await orderService.getSellerOrders(sellerId, req.query);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const sellerUpdateOrderStatus = async (req, res, next) => {
  try {
    const result = await orderService.sellerUpdateOrderStatus(
      req.user.id,
      req.params.orderId,
      req.body.orderStatus,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const adminUpdateOrderStatus = async (req, res, next) => {
  try {
    const result = await orderService.adminUpdateOrderStatus(
      req.params.orderId,
      req.body.orderStatus,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePaymentStatus = async (req, res, next) => {
  try {
    const result = await orderService.updatePaymentStatus(
      req.params.orderId,
      req.body.paymentStatus,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
