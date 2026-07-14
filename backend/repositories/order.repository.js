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
      $sort: {
        _id: 1,
      },
    },
  ]);
};
export const getSellerDailyRevenue = (sellerId) => {
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
