import transporter from "../config/mailer.js";

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `ShopVerse <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return info;
  } catch (error) {
    throw new Error("Failed to send email.");
  }
};

export default sendEmail;
