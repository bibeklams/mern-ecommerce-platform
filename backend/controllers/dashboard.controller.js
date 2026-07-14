import * as dashboardService from "../services/dashboard.service.js";

export const getAdminDashboard = async (req, res, next) => {
  try {
    const result = await dashboardService.getAdminDashboard();

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const getSellerDashboard = async (req, res, next) => {
  try {
    const result = await dashboardService.getSellerDashboard(req.user.id);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
