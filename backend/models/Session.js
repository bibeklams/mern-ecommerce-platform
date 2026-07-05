import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    refreshToken: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    userAgent: {
      type: String,
      default: "",
    },

    ipAddress: {
      type: String,
      default: "",
    },

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 7 days
      expires: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
