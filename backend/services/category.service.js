import * as categoryRepository from "../repositories/category.repository.js";
import { throwError } from "../utils/errorHandler.js";
import { uploadToCloudinary } from "../utils/cloudinaryHandler.js";
import cloudinary from "../config/cloudinary.js";

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
export const getAllCategory = async () => {
  const categories = await categoryRepository.getAllCategory();
  return {
    categories,
  };
};
export const getSingleCategory = async (id) => {
  const category = await categoryRepository.getSingleCategory(id);
  if (!category) {
    throwError("No category found", 400);
  }
  return {
    category,
  };
};
export const updateOne = async (id, data, file) => {
  const existingCategory = await categoryRepository.findOne({
    _id: id,
  });

  if (!existingCategory) {
    throwError("No category found", 404);
  }

  if (file) {
    const result = await uploadToCloudinary(file.buffer);

    if (existingCategory.image?.publicId) {
      await cloudinary.uploader.destroy(existingCategory.image.publicId);
    }

    data.image = {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  const updatedCategory = await categoryRepository.updateOne(id, data);

  return {
    message: "Category successfully updated",
    category: updatedCategory,
  };
};

export const deleteCategory = async (id) => {
  const category = await categoryRepository.getSingleCategory(id);

  if (!category) {
    throwError("No Category found", 404);
  }

  if (category.image?.publicId) {
    await cloudinary.uploader.destroy(category.image.publicId);
  }

  await categoryRepository.deleteOne(id);

  return {
    message: "Category deleted successfully",
  };
};
