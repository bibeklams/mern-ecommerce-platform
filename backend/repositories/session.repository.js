import Session from "../models/Session.js";

export const createSession = (data) => {
  return Session.create(data);
};

export const findSessionByRefreshToken = (refreshToken) => {
  return Session.findOne({ refreshToken });
};

export const deleteSessionByRefreshToken = (refreshToken) => {
  return Session.findOneAndDelete({ refreshToken });
};

export const deleteSessionsByUser = (userId) => {
  return Session.deleteMany({ user: userId });
};
