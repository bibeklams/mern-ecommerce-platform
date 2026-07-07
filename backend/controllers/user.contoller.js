import * as userService from "../services/user.service.js";

export const getProfile = async (req, res, next) => {
  try {
    const result = await userService.getProfile(req.user.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSellers = async (req, res, next) => {
  try {
    const result = await userService.getAllSellers();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const getSingleUser = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers(req.params.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const banUser = async (req, res, next) => {
  try {
    const result = await userService.banUser(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
export const unbanUser = async (req, res, next) => {
  try {
    const result = await userService.unbanUser(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
export const suspendUser = async (req, res, next) => {
  try {
    const result = await userService.suspendUser(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
export const unSuspendUser = async (req, res, next) => {
  try {
    const result = await userService.unsuspendUser(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
export const applyForSeller = async (req, res, next) => {
  try {
    const result = await userService.applyForSeller(req.user.id);
    res.status(200).json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const approveSeller = async (req, res, next) => {
  try {
    const result = await userService.approveSeller(req.params.id);
    res.status(200).json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const rejectSeller = async (req, res, next) => {
  try {
    const result = await userService.rejectSeller(req.params.id);
    res.status(200).json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
