import * as userRepository from "../repositories/user.repository.js";
import * as sessionRepository from "../repositories/session.repository.js";
import { throwError } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import * as otpRepository from "../repositories/opt.repository.js";
import { generateOtp } from "../utils/generateOTP.js";
import { sendVerificationEmail } from "./email.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const register = async (data) => {
  // Check if user already exists
  const existingUser = await userRepository.findByEmail(data.email);

  if (existingUser) {
    throwError("User already exists", 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user
  const user = await userRepository.createUser({
    ...data,
    password: hashedPassword,
  });

  // Generate OTP
  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 10);

  // Save OTP
  await otpRepository.createOtp({
    user: user._id,
    otp: hashedOtp,
    type: "EMAIL_VERIFICATION",
  });

  // Send email
  await sendVerificationEmail({
    email: user.email,
    name: user.name,
    otp,
  });

  return user;
};

export const verifyEmail = async ({ email, otp }) => {
  // Find user
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throwError("User not found", 404);
  }

  // Already verified
  if (user.isVerified) {
    throwError("Email is already verified", 400);
  }

  // Find OTP
  const otpDoc = await otpRepository.findOtp({
    user: user._id,
    type: "EMAIL_VERIFICATION",
  });

  if (!otpDoc) {
    throwError("OTP not found or expired", 400);
  }

  // Check expiration
  if (otpDoc.expiresAt < new Date()) {
    await otpRepository.deleteOtp({ _id: otpDoc._id });
    throwError("OTP has expired", 400);
  }

  // Compare OTP
  const isMatch = await bcrypt.compare(otp, otpDoc.otp);

  if (!isMatch) {
    throwError("Invalid OTP", 400);
  }

  // Verify user
  await userRepository.updateUser(user._id, {
    isVerified: true,
  });

  // Delete OTP
  await otpRepository.deleteOtp({
    _id: otpDoc._id,
  });

  return {
    message: "Email verified successfully.",
  };
};

export const login = async ({ email, password, userAgent, ipAddress }) => {
  // Find user
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throwError("Invalid email or password", 400);
  }

  // Check email verification
  if (!user.isVerified) {
    throwError("Please verify your email first", 403);
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throwError("Invalid email or password", 400);
  }

  // Generate tokens
  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id,
  });

  // Save refresh token in session collection
  await sessionRepository.createSession({
    user: user._id,
    refreshToken,
    userAgent,
    ipAddress,
  });

  // Remove password before sending user
  const { password: hashedPassword, ...safeUser } = user.toObject();

  return {
    user: safeUser,
    accessToken,
    refreshToken,
  };
};
export const refreshToken = async (token) => {
  if (!token) {
    throwError("No token found", 401);
  }

  // Check if session exists
  const session = await sessionRepository.findSessionByRefreshToken(token);

  if (!session) {
    throwError("Session not found", 401);
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throwError("Invalid or expired refresh token", 403);
  }

  const user = await userRepository.findById(decoded.userId);

  if (!user) {
    throwError("User not found", 404);
  }

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });

  return {
    accessToken,
  };
};

export const logout = async (refreshToken) => {
  if (refreshToken) {
    await sessionRepository.deleteSessionByRefreshToken(refreshToken);
  }
};

export const logoutFromAllDevice = async (userId) => {
  await sessionRepository.deleteSessionsByUser(userId);
};
