import * as categoryRepository from "../repositories/category.repository.js";
import { throwError } from "../utils/errorHandler.js";
import { uploadToCloudinary } from "../utils/cloudinaryHandler.js";
import cloudinary from "../config/cloudinary.js";
import redis from "../config/redis.js";

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
  await redis.del(`categories`);
  await redis.del("admin-dashboard");
  return {
    message: "Category created successfully.",
    category,
  };
};
export const getAllCategory = async () => {
  const cacheKey = "categories";

  const cache = await redis.get(cacheKey);

  if (cache) {
    return JSON.parse(cache);
  }

  const categories = await categoryRepository.getAllCategory();

  const result = {
    categories,
  };

  await redis.set(cacheKey, JSON.stringify(result), "EX", 600);

  return result;
};
export const getSingleCategory = async (id) => {
  const cacheKey = `category:${id}`;

  const cache = await redis.get(cacheKey);

  if (cache) {
    return JSON.parse(cache);
  }

  const category = await categoryRepository.getSingleCategory(id);

  if (!category) {
    throwError("No category found", 404);
  }

  const result = {
    category,
  };

  await redis.set(cacheKey, JSON.stringify(result), "EX", 600);

  return result;
};
export const updateOne = async (id, data, file) => {
  const existingCategory = await categoryRepository.getSingleCategory(id);

  if (!existingCategory) {
    throwError("No category found", 404);
  }

  if (data.name) {
    const duplicate = await categoryRepository.findOne({
      name: data.name.trim(),
      _id: { $ne: id },
    });

    if (duplicate) {
      throwError("Category already exists", 400);
    }
  }

  if (file) {
    if (existingCategory.image?.publicId) {
      await cloudinary.uploader.destroy(existingCategory.image.publicId);
    }

    const result = await uploadToCloudinary(file.buffer);

    data.image = {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  const updatedCategory = await categoryRepository.updateOne(id, data);

  // Clear caches
  await redis.del(`category:${id}`);
  await redis.del("categories");
  await redis.del("admin-dashboard");

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
  await redis.del(`category:${id}`);
  await redis.del(`categories`);
  await redis.del("admin-dashboard");
  return {
    message: "Category deleted successfully",
  };
};
