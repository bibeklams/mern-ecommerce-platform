import JWT from "jsonwebtoken";

export const generateAccessToken = (payload) => {
  return JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

export const generateRefreshToken = (payload) => {
  return JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
export const generateResetToken = (user) => {
  return JWT.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.RESET_PASSWORD_SECRET,
    {
      expiresIn: "15m",
    },
  );
};
