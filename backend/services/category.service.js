import * as categoryRepository from "../repositories/category.repository.js";
import { throwError } from "../utils/errorHandler.js";
import { uploadToCloudinary } from "../utils/cloudinaryHandler.js";

export const addCategory = async (data, file) => {
  const { name, description } = data;

  if (!name?.trim()) {
    throwError("Category name is required", 400);
  }

  if (!description?.trim()) {
    throwError("Category description is required", 400);
  }

  const existingCategory = await categoryRepository.findOne({
    name: name.trim(),
  });

  if (existingCategory) {
    throwError("Category already exists", 400);
  }

  let url = "";
  let publicId = "";

  if (file) {
    const result = await uploadToCloudinary(file.buffer);

    url = result.secure_url;
    publicId = result.public_id;
  }

  const category = await categoryRepository.createCategory({
    name: name.trim(),
    description,
    image: {
      url,
      publicId,
    },
  });

  return {
    message: "Category created successfully.",
    category,
  };
};
