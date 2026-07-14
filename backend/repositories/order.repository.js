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
export const countOrders = (filter = {}) => {
  return Order.countDocuments(filter);
};
export const recentOrders = () => {
  return Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(5);
};
export const totalRevenue = () => {
  return Order.aggregate([
    {
      $match: {
        paymentStatus: "PAID",
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);
};
export const getMonthlyRevenue = () => {
  return Order.aggregate([
    {
      $match: {
        paymentStatus: "PAID",
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
        },
        revenue: {
          $sum: "$totalAmount",
        },
      },
    },
    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);
};

export const sellerRevenue = (sellerId) => {
  return Order.aggregate([
    {
      $match: {
        paymentStatus: "PAID",
        "items.seller": sellerId,
      },
    },
    {
      $unwind: "$items",
    },
    {
      $match: {
        "items.seller": sellerId,
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$items.totalPrice",
        },
      },
    },
  ]);
};
