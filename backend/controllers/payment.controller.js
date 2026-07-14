import * as khaltiService from "../services/payment/khalti.service.js";
import * as esewaService from "../services/payment/esewa.service.js";
export const initiateKhaltiPayment = async (req, res, next) => {
  try {
    const result = await khaltiService.initiateKhaltiPayment(
      req.user.id,
      req.body.orderId,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyKhaltiPayment = async (req, res, next) => {
  try {
    const result = await khaltiService.verifyKhaltiPayment(
      req.user.id,
      req.body.pidx,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const initiateEsewaPayment = async (req, res, next) => {
  try {
    const result = await esewaService.initiateEsewaPayment(
      req.user.id,
      req.body.orderId,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEsewaPayment = async (req, res, next) => {
  try {
    const result = await esewaService.verifyEsewaPayment(
      req.user.id,
      req.body.transactionUuid,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
