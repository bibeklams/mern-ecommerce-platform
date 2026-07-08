import * as productRepository from "../repositories/product.repository.js";
import * as userRepository from "../repositories/user.repository.js";
import * as categoryRepository from "../repositories/category.repository.js";
import { uploadToCloudinary } from "../utils/cloudinaryHandler.js";
import { throwError } from "../utils/throwError.js";

export const addProduct = async (data, sellerId, file) => {
  // Check seller exists
  const seller = await userRepository.findById(sellerId);

  if (!seller) {
    throwError("Seller not found", 404);
  }

  // Check seller role
  if (seller.role !== "SELLER" && seller.role !== "ADMIN") {
    throwError("Only sellers and admins can create products", 403);
  }

  // Check seller approval
  if (seller.role === "SELLER" && seller.sellerStatus !== "APPROVED") {
    throwError("Seller account is not approved", 403);
  }
  const category = await categoryRepository.findById(data.category);

  if (!category) {
    throwError("Category not found", 404);
  }
  // Calculate final price
  const finalPrice = Number(data.price) - Number(data.discountAmount || 0);

  // Upload image if provided
  let images = [];

  if (file) {
    const result = await uploadToCloudinary(file.buffer);

    images.push({
      public_id: result.public_id,
      secure_url: result.secure_url,
    });
  }
  if (!result) {
    throwError("Image upload failed", 500);
  }
  const productData = {
    ...data,
    seller: sellerId,
    category: category._id,
    finalPrice,
    images,
  };

  // Save product
  const product = await productRepository.createProduct(productData);

  return {
    message: "Product created successfully",
    product,
  };
};
