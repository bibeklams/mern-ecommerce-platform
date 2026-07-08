import * as productService from "../services/product.service.js";

export const addProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const sellerId = req.user.id;
    const file = req.file;
    const result = await productService.addProduct(productData, sellerId, file);

    res.status(201).json({
      success: true,
      message: result.message,
      data: result.product,
    });
  } catch (error) {
    next(error);
  }
};
