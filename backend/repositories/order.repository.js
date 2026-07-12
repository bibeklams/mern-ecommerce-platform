import Order from "../models/Order.js";

export const createOrder = (data) => {
  return Order.create(data);
};

export const findById = (id) => {
  return Order.findById(id);
};

export const findOne = (filter) => {
  return Order.findOne(filter);
};

export const findAll = (filter = {}) => {
  return Order.find(filter)
    .populate("user", "name email")
    .sort({ createdAt: -1 });
};

export const update = (id, data) => {
  return Order.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
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
