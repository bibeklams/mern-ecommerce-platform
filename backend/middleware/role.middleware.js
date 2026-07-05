import { throwError } from "../utils/errorHandler.js";

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throwError("Forbidden", 403);
    }

    next();
  };
};
