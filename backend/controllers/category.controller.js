import * as categoryService from "../services/category.service.js";

export const addCategory = async (req, res, next) => {
  try {
    const result = await categoryService.addCategory(req.body, req.file);

    res.status(201).json({
      success: true,
      message: result.message,
      data: {
        category: result.category,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const getAllCategory = async (req, res, next) => {
  try {
    const result = await categoryService.getAllCategory();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleCategory = async (req, res, next) => {
  try {
    const result = await categoryService.getSingleCategory(req.params.id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const updateCategory = async (req, res, next) => {
  try {
    const result = await categoryService.updateCategory(
      req.params.id,
      req.body,
      req.file,
    );
    res.status(200).json({
      success: true,
      data: {
        message: result.message,
        category: result.category,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const result = await categoryService.deleteCategory(req.params.id);
    res.status(200).json({
      success: true,
      data: {
        message: result.message,
        category: result.category,
      },
    });
  } catch (error) {
    next(error);
  }
};
