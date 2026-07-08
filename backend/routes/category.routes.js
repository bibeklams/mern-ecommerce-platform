import express from "express";
import protect from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";
import * as categoryController from "../controllers/category.controller.js";

const router = express.Router();

// Public
router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getSingleCategory);

// Admin only
router.post(
  "/",
  protect,
  authorize("ADMIN"),
  upload.single("image"),
  categoryController.addCategory,
);

router.patch(
  "/:id",
  protect,
  authorize("ADMIN"),
  upload.single("image"),
  categoryController.updateCategory,
);

router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  categoryController.deleteCategory,
);

export default router;
