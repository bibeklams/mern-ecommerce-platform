import express from "express";
import protect from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";
import * as productController from "../controllers/product.contoller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("SELLER"),
  upload.array("images", 5),
  productController.addProduct,
);

router.get("/", productController.getAllProduct);

router.get(
  "/seller/my-products",
  protect,
  authorize("SELLER"),
  productController.getAllSellerProduct,
);

router.get("/:id", productController.getSingleProduct);

router.put(
  "/:id",
  protect,
  authorize("SELLER"),
  upload.array("images", 5),
  productController.updateProduct,
);

router.delete(
  "/:id",
  protect,
  authorize("SELLER", "ADMIN"),
  productController.deleteProduct,
);
export default router;
