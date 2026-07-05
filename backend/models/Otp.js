import mongoose from "mongoose";

const optSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    otp: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["EMAIL_VERIFICATION", "PASSWORD_RESET"],
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 60 * 1000), // 10 minutes
      expires: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Otp = mongoose.model("Otp", optSchema);

export default Otp;
