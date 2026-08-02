import Order from "../models/Order.js";
import mongoose from "mongoose";
export const createOrder = (data) => {
  return Order.create(data);
};

export const findById = (id) => {
  return Order.findById(id);
};

export const findOne = (filter) => {
  return Order.findOne(filter);
};

export const findAll = (filter = {}, { page = 1, limit = 10 } = {}) => {
  const skip = (page - 1) * limit;

  return Order.find(filter)
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
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
        $or: [
          {
            paymentStatus: "PAID",
          },
          {
            paymentMethod: "COD",
            orderStatus: "DELIVERED",
          },
        ],
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
  const start = new Date();

  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  return Order.aggregate([
    {
      $match: {
        paymentStatus: "PAID",
        createdAt: {
          $gte: start,
        },
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

export const getDailyRevenue = () => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);

  tomorrow.setDate(today.getDate() + 1);

  return Order.aggregate([
    {
      $match: {
        paymentStatus: "PAID",
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
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
export const getWeeklyRevenue = () => {
  return Order.aggregate([
    {
      $match: {
        paymentStatus: "PAID",
      },
    },

    {
      $group: {
        _id: {
          $dayOfWeek: "$createdAt",
        },

        revenue: {
          $sum: "$totalAmount",
        },
      },
    },

    {
      $project: {
        _id: 0,
        date: "$_id",
        revenue: 1,
      },
    },

    {
      $sort: {
        date: 1,
      },
    },
  ]);
};
export const sellerRevenue = (sellerId) => {
  sellerId = new mongoose.Types.ObjectId(sellerId);

  return Order.aggregate([
    {
      $match: {
        paymentStatus: "PAID",
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
export const getSellerDailyRevenue = (sellerId) => {
  sellerId = new mongoose.Types.ObjectId(sellerId);

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);

  tomorrow.setDate(today.getDate() + 1);

  return Order.aggregate([
    {
      $match: {
        paymentStatus: "PAID",
      },
    },

    {
      $unwind: "$items",
    },

    {
      $match: {
        "items.seller": sellerId,
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
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
export const getSellerWeeklyRevenue = (sellerId) => {
  sellerId = new mongoose.Types.ObjectId(sellerId);

  const startDate = new Date();

  startDate.setDate(startDate.getDate() - 7);

  return Order.aggregate([
    {
      $match: {
        paymentStatus: "PAID",
        createdAt: {
          $gte: startDate,
        },
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
        _id: {
          $dayOfWeek: "$createdAt",
        },

        revenue: {
          $sum: "$items.totalPrice",
        },
      },
    },

    {
      $sort: {
        _id: 1,
      },
    },
  ]);
};
