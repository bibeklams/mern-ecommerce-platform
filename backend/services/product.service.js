import * as productRepository from "../repositories/product.repository.js";
import * as userRepository from "../repositories/user.repository.js";
import * as categoryRepository from "../repositories/category.repository.js";
import { uploadToCloudinary } from "../utils/cloudinaryHandler.js";
import { throwError } from "../utils/errorHandler.js";
import cloudinary from "../config/cloudinary.js";
import redis from "../config/redis.js";

export const addProduct = async (data, sellerId, files) => {
  // Check seller exists
  const seller = await userRepository.findUserById(sellerId);

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
  const category = await categoryRepository.getSingleCategory(data.category);

  if (!category) {
    throwError("Category not found", 404);
  }
  // Calculate final price
  const finalPrice = Number(data.price) - Number(data.discountAmount || 0);

  // Upload image if provided
  if (!files || files.length === 0) {
    throwError("At least one product image is required", 400);
  }

  let images = [];

  for (const file of files) {
    const result = await uploadToCloudinary(file.buffer);

    images.push({
      public_id: result.public_id,
      secure_url: result.secure_url,
    });
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

  // Seller products cache
  const sellerKeys = await redis.keys(`seller-products:${sellerId}:*`);

  if (sellerKeys.length) {
    await redis.del(...sellerKeys);
  }

  // Public products cache
  const productKeys = await redis.keys("products:*");

  if (productKeys.length) {
    await redis.del(...productKeys);
  }

  // Featured products cache
  if (product.isFeatured) {
    await redis.del("featured-products");
  }
  const adminProductKeys = await redis.keys("admin-products:*");

  if (adminProductKeys.length) {
    await redis.del(...adminProductKeys);
  }
  await redis.del("admin-dashboard");
  await redis.del(`seller-dashboard:${sellerId}`);
  return {
    message: "Product created successfully",
    product,
  };
};
export const getAllSellerProduct = async (sellerId, options) => {
  const cacheKey = `seller-products:${sellerId}:page:${options.page}:limit:${options.limit}`;

  const cache = await redis.get(cacheKey);

  if (cache) {
    return JSON.parse(cache);
  }

  const products = await productRepository.findAllProducts(
    { seller: sellerId },
    options,
  );

  const totalProducts = await productRepository.countProducts({
    seller: sellerId,
  });

  const result = {
    products,
    totalPages: Math.ceil(totalProducts / options.limit),
    currentPage: options.page,
  };

  await redis.set(
    cacheKey,
    JSON.stringify(result),
    "EX",
    600, // 10 minutes
  );

  return result;
};
export const getSingleProduct = async (id) => {
  const cacheKey = `product:${id}`;

  // 1. Check Redis first
  const cache = await redis.get(cacheKey);

  if (cache) {
    return JSON.parse(cache);
  }

  // 2. Redis miss -> MongoDB
  const product = await productRepository.findById(id);

  if (!product) {
    throwError("No product found", 404);
  }

  const result = {
    product: product.toObject(),
  };

  // 3. Save to Redis
  await redis.set(cacheKey, JSON.stringify(result), "EX", 600);

  // 4. Return data
  return result;
};
export const updateProduct = async (id, sellerId, data, files) => {
  // ==========================
  // Check Product Exists
  // ==========================

  const existingProduct = await productRepository.findById(id);

  if (!existingProduct) {
    throwError("Product not found", 404);
  }

  // ==========================
  // Check User Exists
  // ==========================

  const user = await userRepository.findUserById(sellerId);

  if (!user) {
    throwError("Unauthorized", 403);
  }

  // ==========================
  // Seller Ownership Check
  // Admin can update any product
  // ==========================

  if (
    user.role === "SELLER" &&
    existingProduct.seller._id.toString() !== sellerId
  ) {
    throwError("You can only update your own product", 403);
  }

  // ==========================
  // Validate Category
  // ==========================

  if (data.category) {
    const category = await categoryRepository.getSingleCategory(data.category);

    if (!category) {
      throwError("Category not found", 404);
    }

    data.category = category._id;
  }

  // ==========================
  // Replace Images
  // ==========================

  if (files && files.length > 0) {
    // Delete old images
    for (const image of existingProduct.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    data.images = [];

    // Upload new images
    for (const file of files) {
      const result = await uploadToCloudinary(file.buffer);

      data.images.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  // ==========================
  // Recalculate Final Price
  // ==========================

  if (data.price || data.discountAmount) {
    const price = Number(data.price ?? existingProduct.price);

    const discount = Number(
      data.discountAmount ?? existingProduct.discountAmount,
    );

    if (discount > price) {
      throwError("Discount amount cannot exceed product price.", 400);
    }

    data.finalPrice = Math.max(price - discount, 0);
  }

  // ==========================
  // Update Product
  // ==========================

  const updatedProduct = await productRepository.updateProduct(id, data);

  // ==================================================
  // Redis Cache Invalidation
  // ==================================================

  // 1. Delete single product cache
  await redis.del(`product:${id}`);

  // 2. Delete seller products cache
  const sellerKeys = await redis.keys(`seller-products:${sellerId}:*`);

  if (sellerKeys.length) {
    await redis.del(...sellerKeys);
  }

  // 3. Delete featured products cache
  await redis.del("featured-products");
  // 4. Delete public products cache
  const productKeys = await redis.keys("products:*");

  if (productKeys.length) {
    await redis.del(...productKeys);
  }
  const adminProductKeys = await redis.keys("admin-products:*");

  if (adminProductKeys.length) {
    await redis.del(...adminProductKeys);
  }
  await redis.del("admin-dashboard");
  await redis.del(`seller-dashboard:${sellerId}`);
  // ==================================================

  return {
    message: "Product updated successfully",
    product: updatedProduct,
  };
};
export const getAllProduct = async (search, category, options) => {
  const cacheKey = `products:search:${search || "all"}:category:${category || "all"}:page:${options.page}:limit:${options.limit}`;
  const cache = await redis.get(cacheKey);
  if (cache) {
    return JSON.parse(cache);
  }
  const filter = {
    status: "ACTIVE",
  };

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
      {
        brand: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (category) {
    filter.category = category;
  }

  const products = await productRepository.findAllProducts(filter, options);

  const totalProducts = await productRepository.countProducts(filter);

  const totalPages = Math.ceil(totalProducts / options.limit);

  const result = {
    products,
    currentPage: options.page,
    totalPages,
    totalProducts,
  };
  await redis.set(cacheKey, JSON.stringify(result), "EX", 600);
  return result;
};
export const deleteProduct = async (productId, userId) => {
  // ==========================
  // Check User
  // ==========================

  const user = await userRepository.findUserById(userId);

  if (!user) {
    throwError("Unauthorized user", 403);
  }

  if (!["SELLER", "ADMIN"].includes(user.role)) {
    throwError("Only sellers and admins can delete products", 403);
  }

  // ==========================
  // Check Product
  // ==========================

  const product = await productRepository.findById(productId);

  if (!product) {
    throwError("Product not found", 404);
  }

  // Seller can delete only own product
  if (user.role === "SELLER" && product.seller._id.toString() !== userId) {
    throwError("You can only delete your own products", 403);
  }

  // ==========================
  // Delete Images
  // ==========================

  for (const image of product.images) {
    await cloudinary.uploader.destroy(image.public_id);
  }

  // ==========================
  // Delete Product
  // ==========================

  await productRepository.deleteProduct(productId);

  // ==========================
  // Clear Redis Cache
  // ==========================
  const sellerId = product.seller._id.toString();

  // Single product
  await redis.del(`product:${productId}`);

  // Featured products
  await redis.del("featured-products");

  // Seller dashboard
  await redis.del(`seller-dashboard:${sellerId}`);

  // Seller products
  const sellerKeys = await redis.keys(`seller-products:${sellerId}:*`);

  if (sellerKeys.length) {
    await redis.del(...sellerKeys);
  }

  // Public products
  const productKeys = await redis.keys("products:*");

  if (productKeys.length) {
    await redis.del(...productKeys);
  }

  // Admin products
  const adminProductKeys = await redis.keys("admin-products:*");

  if (adminProductKeys.length) {
    await redis.del(...adminProductKeys);
  }

  // Admin dashboard
  await redis.del("admin-dashboard");
  await redis.del(`seller-dashboard:${sellerId}`);
  return {
    message: "Product deleted successfully",
  };
};
export const getAdminProducts = async (
  search,
  category,
  status,
  featured,
  sort,
  options,
) => {
  const cacheKey =
    `admin-products:` +
    `search:${search || "all"}:` +
    `category:${category || "all"}:` +
    `status:${status || "all"}:` +
    `featured:${featured ?? "all"}:` +
    `sort:${sort || "latest"}:` +
    `page:${options.page}:` +
    `limit:${options.limit}`;

  const cache = await redis.get(cacheKey);

  if (cache) {
    return JSON.parse(cache);
  }
  const filter = {};

  // Search
  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
      {
        brand: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // Category
  if (category) {
    filter.category = category;
  }

  // Status
  if (status) {
    filter.status = status;
  }

  // Featured
  if (featured !== undefined) {
    filter.isFeatured = featured === "true";
  }

  // Sorting
  let sortOption = { createdAt: -1 };

  switch (sort) {
    case "oldest":
      sortOption = { createdAt: 1 };
      break;

    case "price-low":
      sortOption = { finalPrice: 1 };
      break;

    case "price-high":
      sortOption = { finalPrice: -1 };
      break;

    case "stock":
      sortOption = { stock: -1 };
      break;

    default:
      sortOption = { createdAt: -1 };
  }

  const products = await productRepository.findAdminProducts(filter, {
    ...options,
    sort: sortOption,
  });

  const totalProducts = await productRepository.countProducts(filter);

  const result = {
    products,
    currentPage: options.page,
    totalPages: Math.ceil(totalProducts / options.limit),
    totalProducts,
  };
  await redis.set(cacheKey, JSON.stringify(result), "EX", 600);
  return result;
};
export const toggleFeatured = async (productId) => {
  const product = await productRepository.findById(productId);

  if (!product) {
    throwError("Product not found", 404);
  }

  const updatedProduct = await productRepository.updateProduct(productId, {
    isFeatured: !product.isFeatured,
  });

  // ==========================
  // Clear Redis Cache
  // ==========================

  // Single product cache
  await redis.del(`product:${productId}`);

  // Featured products cache
  await redis.del("featured-products");

  // Seller products cache
  const sellerKeys = await redis.keys(
    `seller-products:${updatedProduct.seller._id || updatedProduct.seller}:*`,
  );

  if (sellerKeys.length) {
    await redis.del(...sellerKeys);
  }

  // Public products cache
  const productKeys = await redis.keys("products:*");

  if (productKeys.length) {
    await redis.del(...productKeys);
  }
  const adminProductKeys = await redis.keys("admin-products:*");

  if (adminProductKeys.length) {
    await redis.del(...adminProductKeys);
  }
  // Admin dashboard
  await redis.del("admin-dashboard");
  await redis.del(`seller-dashboard:${sellerId}`);
  // ==========================

  return {
    message: `Product ${
      updatedProduct.isFeatured ? "featured" : "removed from featured"
    } successfully`,
    product: updatedProduct,
  };
};
export const getFeaturedProducts = async () => {
  const cacheKey = "featured-products";

  const cache = await redis.get(cacheKey);

  if (cache) {
    return JSON.parse(cache);
  }

  const products = await productRepository.getFeaturedProducts();

  await redis.set(cacheKey, JSON.stringify(products), "EX", 600);

  return products;
};
export const changeProductStatus = async (productId, status) => {
  const allowedStatus = ["ACTIVE", "INACTIVE", "OUT_OF_STOCK"];

  if (!allowedStatus.includes(status)) {
    throwError("Invalid product status", 400);
  }

  const product = await productRepository.findById(productId);

  if (!product) {
    throwError("Product not found", 404);
  }

  const updatedProduct = await productRepository.updateProduct(productId, {
    status,
  });

  // Single product cache
  await redis.del(`product:${productId}`);

  // Seller products cache
  const sellerId =
    updatedProduct.seller._id?.toString() || updatedProduct.seller.toString();

  const sellerKeys = await redis.keys(`seller-products:${sellerId}:*`);

  if (sellerKeys.length) {
    await redis.del(...sellerKeys);
  }

  // Public products cache
  const productKeys = await redis.keys("products:*");

  if (productKeys.length) {
    await redis.del(...productKeys);
  }

  // Featured products cache
  await redis.del("featured-products");
  const adminProductKeys = await redis.keys("admin-products:*");

  if (adminProductKeys.length) {
    await redis.del(...adminProductKeys);
  }
  await redis.del("admin-dashboard");
  await redis.del(`seller-dashboard:${sellerId}`);
  return {
    message: "Product status updated successfully",
    product: updatedProduct,
  };
};
