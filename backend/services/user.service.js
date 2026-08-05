import * as userRepository from "../repositories/user.repository.js";
import * as notificationService from "./notification.service.js";
import { throwError } from "../utils/errorHandler.js";
import redis from "../config/redis.js";
export const getAllUsers = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const cacheKey =
    `users:` +
    `page:${page}:` +
    `limit:${limit}:` +
    `search:${query.search || "all"}`;

  const cache = await redis.get(cacheKey);

  if (cache) {
    return JSON.parse(cache);
  }

  const filter = {
    role: "USER",
    isVerified: true,
  };

  const users = await userRepository.findAllUsers(filter, page, limit);

  const total = await userRepository.countUsers(filter);

  const result = {
    users,
    page,
    pages: Math.ceil(total / limit),
    total,
  };

  await redis.set(cacheKey, JSON.stringify(result), "EX", 600);

  return result;
};

export const getAllSellers = async () => {
  const cacheKey = `sellers`;
  const cache = await redis.get(cacheKey);
  if (cache) {
    return JSON.parse(cache);
  }
  const users = await userRepository.findAllUsers({
    role: "SELLER",
    isVerified: true,
  });
  const result = {
    users,
  };

  await redis.set(cacheKey, JSON.stringify(result), "EX", 600);

  return result;
};
export const getSingleUser = async (id) => {
  const cacheKey = `user:${id}`;
  const cache = await redis.get(cacheKey);
  if (cache) {
    return JSON.parse(cache);
  }
  const user = await userRepository.findUserById(id);
  if (!user) {
    throwError("No user found", 404);
  }
  const result = {
    user,
  };
  await redis.set(cacheKey, JSON.stringify(result), "EX", 600);
  return result;
};
export const getProfile = async (id) => {
  const cacheKey = `profile:${id}`;
  const cache = await redis.get(cacheKey);
  if (cache) {
    return JOSN.parse(cache);
  }
  const user = await userRepository.findUserById(id);
  if (!user) {
    throwError("No user found", 404);
  }
  const result = {
    user,
  };
  await redis.set(cacheKey, JSON.stringify(result), "EX", 600);
  return result;
};
const updateUserStatus = async (id, status) => {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throwError("User not found", 404);
  }

  user.status = status;
  await user.save();

  const result = {
    message: `User ${status.toLowerCase()} successfully`,
    user,
  };
  await redis.del(`profile:${id}`);
  await redis.del(`sellers`);
  await redis.del(`user:${id}`);
  const usersKey = await redis.keys(`users:*`);
  if (usersKey.length) {
    await redis.del(...usersKey);
  }
  await redis.del(`admin-dashboard`);
  return result;
};

export const banUser = (id) => {
  return updateUserStatus(id, "BANNED");
};

export const unbanUser = (id) => {
  return updateUserStatus(id, "ACTIVE");
};

export const suspendUser = (id) => {
  return updateUserStatus(id, "SUSPENDED");
};

export const unsuspendUser = (id) => {
  return updateUserStatus(id, "ACTIVE");
};

export const applyForSeller = async (id) => {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throwError("User not found", 404);
  }

  // ADMIN cannot apply
  if (user.role === "ADMIN") {
    throwError("Admin cannot apply for seller", 403);
  }

  // Already seller
  if (user.role === "SELLER") {
    throwError("You are already a seller", 400);
  }

  // Already pending
  if (user.sellerStatus === "PENDING") {
    throwError("Seller application already pending", 400);
  }

  const updatedUser = await userRepository.updateUser(id, {
    sellerStatus: "PENDING",
  });

  await notificationService.createNotification({
    user: id,
    title: "Seller Application Submitted",
    message:
      "Your seller application has been submitted successfully. Please wait for admin approval.",
    type: "SELLER_APPLICATION",
  });

  // Redis
  await redis.del(`profile:${id}`);
  await redis.del(`user:${id}`);

  const usersKeys = await redis.keys("users:*");

  if (usersKeys.length) {
    await redis.del(...usersKeys);
  }

  await redis.del("admin-dashboard");

  return {
    message:
      "Seller application submitted successfully. Waiting for admin approval.",
    user: updatedUser,
  };
};
export const approveSeller = async (id) => {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throwError("User not found", 404);
  }
  if (user.status === "SUSPENDED") {
    throwError("Seller id has been suspended", 400);
  }
  if (user.status === "BANNED") {
    throwError("Seller id has been banned", 400);
  }
  if (user.sellerStatus === "NONE") {
    throwError("User has not applied to become a seller", 400);
  }

  if (user.sellerStatus === "REJECTED") {
    throwError("Seller application was rejected", 400);
  }

  if (user.sellerStatus === "APPROVED") {
    throwError("Seller is already approved", 400);
  }

  if (user.sellerStatus !== "PENDING") {
    throwError("Seller application is not pending", 400);
  }

  const updatedUser = await userRepository.updateUser(id, {
    role: "SELLER",
    sellerStatus: "APPROVED",
  });

  await notificationService.createNotification({
    user: id,
    title: "Seller Approved",
    message: "Congratulations! Your seller account has been approved.",
    type: "SELLER",
  });
  // Redis
  // Redis
  await redis.del(`profile:${id}`);
  await redis.del(`user:${id}`);

  const usersKeys = await redis.keys("users:*");

  if (usersKeys.length) {
    await redis.del(...usersKeys);
  }

  await redis.del("sellers");
  await redis.del("admin-dashboard");
  return {
    message: "Seller application approved successfully.",
    user: updatedUser,
  };
};

export const rejectSeller = async (id) => {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throwError("User not found.", 404);
  }

  if (user.sellerStatus === "NONE") {
    throwError("User has not applied to become a seller.", 400);
  }

  if (user.sellerStatus === "REJECTED") {
    throwError("Seller application is already rejected.", 400);
  }

  if (user.sellerStatus === "APPROVED") {
    throwError("Seller application has already been approved.", 400);
  }

  if (user.sellerStatus !== "PENDING") {
    throwError("Seller application is not pending.", 400);
  }

  const updatedUser = await userRepository.updateUser(id, {
    role: "USER",
    sellerStatus: "REJECTED",
  });

  await notificationService.createNotification({
    user: updatedUser._id,
    title: "Seller Application Rejected",
    message:
      "Unfortunately, your seller application has been rejected. Please contact support or apply again later if applicable.",
    type: "SELLER",
  });
  // Redis
  await redis.del(`profile:${id}`);
  await redis.del(`user:${id}`);

  const usersKeys = await redis.keys("users:*");

  if (usersKeys.length) {
    await redis.del(...usersKeys);
  }

  await redis.del("admin-dashboard");

  return {
    message: "Seller application rejected successfully.",
    user: updatedUser,
  };
};
