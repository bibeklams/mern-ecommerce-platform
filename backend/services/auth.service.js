import * as userRepository from "../repositories/user.repository.js";
import { throwError } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import * as otpRepository from "../repositories/opt.repository.js";
import { generateOtp } from "../utils/generateOTP.js";
import { sendVerificationEmail } from "./email.service.js";
export const register = async (data) => {
  // 1. Check if user already exists
  const existingUser = await userRepository.findByEmail(data.email);

  if (existingUser) {
    throwError("User already exists", 400);
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // 3. Create user
  const user = await userRepository.createUser({
    ...data,
    password: hashedPassword,
  });

  // 4. Generate OTP
  const otp = generateOtp();

  // 5. Save OTP
  await otpRepository.createOtp({
    user: user._id,
    otp,
    type: "EMAIL_VERIFICATION",
  });

  // 6. Send verification email
  await sendVerificationEmail(user.email, user.name, otp);

  // 7. Return user
  return user;
};

export const verifyEmail = async ({ email, otp }) => {
  // 1. Find user
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throwError("User not found", 404);
  }

  // 2. Find OTP
  const otpDoc = await otpRepository.findOtp({
    user: user._id,
    otp,
    type: "EMAIL_VERIFICATION",
  });

  if (!otpDoc) {
    throwError("Invalid OTP", 400);
  }

  // 3. Verify user
  await userRepository.updateUser(user._id, {
    isVerified: true,
  });

  // 4. Delete OTP
  await otpRepository.deleteOtp({
    _id: otpDoc._id,
  });

  return {
    message: "Email verified successfully.",
  };
};
