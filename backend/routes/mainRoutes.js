import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import categoryRoutes from "./category.routes.js";
import productRoutes from "./product.routes.js";
import wishlistRoutes from "./wishlist.routes.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/wishlist", wishlistRoutes);

export default router;
