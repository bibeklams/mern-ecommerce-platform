import * as cartService from "../services/cart.service.js";

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const result = await cartService.addToCart(userId, productId);

    res.status(201).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const myCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await cartService.myCart(userId);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const { quantity } = req.body;

    const result = await cartService.updateCart(userId, productId, quantity);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const result = await cartService.deleteCart(userId, productId);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const countCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await cartService.countCart(userId);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await cartService.clearCart(userId);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
