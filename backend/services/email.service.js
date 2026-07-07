import sendEmail from "../utils/sendEmail.js";
import verifyEmailTemplate from "../tamplates/verifyEmail.js";

export const sendVerificationEmail = async ({ email, name, otp }) => {
  await sendEmail({
    to: email,
    subject: "Verify your ShopVerse account",
    html: verifyEmailTemplate(name, otp),
  });
};

export const sendResetOtp = async ({ email, name, otp }) => {
  await sendEmail({
    to: email,
    subject: "Verify your ShopVerse account",
    html: verifyEmailTemplate(name, otp),
  });
};
