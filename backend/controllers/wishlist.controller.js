import * as wishlistServie from "../services/wishList.service.js";

export const createWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;
    const result = await wishlistServie.createWishlist(userId, productId);
    res.status(201).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const findAllWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await wishlistServie.findAllWishlist(userId);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;
    const result = await wishlistServie.deleteWishlist(userId, productId);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const isWishlisted = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;
    const result = await wishlistServie.isWishlisted(userId, productId);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const countWishlist = async (req, res, next) => {
  try {
    const result = await wishlistServie.countWishlist(req.user.id);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
