import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 30,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      minlength: 6,
    },

    provider: {
      type: String,
      enum: ["LOCAL", "GOOGLE"],
      required: true,
      default: "LOCAL",
    },

    googleId: {
      type: String,
      default: null,
    },

    url: {
      type: String,
      default: null,
    },
    publicId: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      required: true,
      enum: ["USER", "SELLER", "ADMIN"],
      default: "USER",
    },
    sellerStatus: {
      type: String,
      enum: ["NONE", "PENDING", "APPROVED", "REJECTED"],
      default: "NONE",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "BANNED"],
      default: "ACTIVE",
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
