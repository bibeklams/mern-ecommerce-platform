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
