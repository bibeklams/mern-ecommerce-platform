import * as productRepository from "../repositories/product.repository.js";
import * as userRepository from "../repositories/user.repository.js";
import * as categoryRepository from "../repositories/category.repository.js";
import { uploadToCloudinary } from "../utils/cloudinaryHandler.js";
import { throwError } from "../utils/throwError.js";
import cloudinary from "../config/cloudinary.js";

export const addProduct = async (data, sellerId, files) => {
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

  for (const file of files) {
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
export const getAllSellerProduct = async (sellerId, options) => {
  const products = await productRepository.findAllProducts(
    { seller: sellerId },
    options,
  );

  const totalProducts = await productRepository.countProducts({
    seller: sellerId,
  });

  const totalPages = Math.ceil(totalProducts / options.limit);

  return {
    products,
    totalPages,
    currentPage: options.page,
  };
};
export const getSingleProduct = async (id) => {
  const product = await productRepository.findById(id);

  if (!product) {
    throwError("No product found", 404);
  }

  return product;
};
export const updateProduct = async (id, sellerId, data, files) => {
  // Check product exists
  const existingProduct = await productRepository.findById(id);

  if (!existingProduct) {
    throwError("Product not found", 404);
  }

  // Check user exists
  const user = await userRepository.findById(sellerId);

  if (!user) {
    throwError("Unauthorized", 403);
  }

  // Seller can only update their own product
  if (
    user.role === "SELLER" &&
    existingProduct.seller.toString() !== sellerId
  ) {
    throwError("Only the product owner can update this product", 403);
  }

  // Replace images if new images are uploaded
  if (files && files.length > 0) {
    // Delete old images from Cloudinary
    for (const image of existingProduct.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // Upload new images
    data.images = [];

    for (const file of files) {
      const result = await uploadToCloudinary(file.buffer);

      data.images.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  // Recalculate final price if needed
  if (data.price || data.discountAmount) {
    const price = Number(data.price ?? existingProduct.price);
    const discount = Number(
      data.discountAmount ?? existingProduct.discountAmount,
    );

    data.finalPrice = price - discount;
  }

  const updatedProduct = await productRepository.updateProduct(id, data);

  return {
    message: "Product updated successfully",
    product: updatedProduct,
  };
};
export const getAllProduct = async (search, category, options) => {
  const filter = {};

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (category) {
    filter.category = category;
  }

  const products = await productRepository.findAllProducts(filter, options);

  const totalProducts = await productRepository.countProducts(filter);

  const totalPages = Math.ceil(totalProducts / options.limit);

  return {
    products,
    currentPage: options.page,
    totalPages,
    totalProducts,
  };
};
export const deleteProduct = async (productId, userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throwError("Unauthorized user", 403);
  }

  if (user.role === "USER") {
    throwError("Only sellers and admins can delete products", 403);
  }

  const product = await productRepository.findById(productId);

  if (!product) {
    throwError("Product not found", 404);
  }

  // Seller can delete only their own product
  if (user.role === "SELLER" && product.seller.toString() !== userId) {
    throwError("You can only delete your own products", 403);
  }

  const deletedProduct = await productRepository.deleteProduct(productId);

  return {
    message: "Product deleted successfully",
    product: deletedProduct,
  };
};
