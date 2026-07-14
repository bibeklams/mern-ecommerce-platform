import * as userRepository from "../repositories/user.repository.js";
import * as notificationService from "./notification.service.js";
import { throwError } from "../utils/errorHandler.js";
export const getAllUsers = async () => {
  const users = await userRepository.findAllUsers({
    role: "USER",
    isVerified: true,
  });

  return {
    users,
  };
};
export const getAllSellers = async () => {
  const users = await userRepository.findAllUsers({
    role: "SELLER",
    isVerified: true,
  });

  return {
    users,
  };
};
export const getSingleUser = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throwError("No user found", 404);
  }
  return {
    user,
  };
};
export const getProfile = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throwError("No user found", 404);
  }
  return {
    user,
  };
};
const updateUserStatus = async (id, status) => {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throwError("User not found", 404);
  }

  user.status = status;
  await user.save();

  return {
    message: `User ${status.toLowerCase()} successfully`,
  };
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

  if (user.role === "SELLER") {
    throwError("User is already a seller", 400);
  }

  if (user.role === "ADMIN") {
    throwError("Admin cannot apply to become a seller", 400);
  }

  if (user.sellerStatus === "PENDING") {
    throwError("Seller application is already pending", 400);
  }

  const updatedUser = await userRepository.updateUser(id, {
    sellerStatus: "PENDING",
  });

  return {
    message:
      "Seller application submitted successfully. Please wait for admin approval.",
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

  return {
    message: "Seller application rejected successfully.",
    user: updatedUser,
  };
};
