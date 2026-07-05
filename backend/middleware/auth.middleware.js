import JWT from "jsonwebtoken";
import User from "../models/User.js";
import { throwError } from "../utils/errorHandler.js";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throwError("Please login", 401);
    }

    const decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      throwError("User not found", 404);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default protect;
