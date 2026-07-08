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
      product: result.product,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllSellerProduct = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;

    const skip = (page - 1) * limit;

    const result = await productService.getAllSellerProduct(req.user.id, {
      page,
      limit,
      skip,
    });

    res.status(200).json({
      success: true,
      products: result.product,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const result = await productService.getSingleProduct(req.body.id);
    res.status(200).json({
      success: true,
      product: result.product,
    });
  } catch (error) {
    next(error);
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    const result = await productService.updateProduct(
      req.params.id,
      req.body,
      req.file,
    );

    res.status(200).json({
      success: true,
      message: result.message,
      product: result.product,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    });
  } catch (error) {
    next(error);
  }
};
