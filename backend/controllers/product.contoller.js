import * as productService from "../services/product.service.js";

export const addProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const sellerId = req.user.id;
    const files = req.files;
    const result = await productService.addProduct(
      productData,
      sellerId,
      files,
    );

    res.status(201).json({
      success: true,
      ...result,
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
      products: result.products,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const result = await productService.getSingleProduct(req.params.id);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    const result = await productService.updateProduct(
      req.params.id,
      req.user.id,
      req.body,
      req.files,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllProduct = async (req, res, next) => {
  try {
    const search = req.query.search;
    const category = req.query.category;

    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const options = { page, limit, skip };

    const result = await productService.getAllProduct(
      search,
      category,
      options,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(
      req.params.id, // product ID
      req.user.id, // logged-in user ID
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
