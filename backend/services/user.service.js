import * as userRepository from "../repositories/user.repository.js";
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
