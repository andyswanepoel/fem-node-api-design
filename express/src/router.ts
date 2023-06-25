import { Router } from "express";
import {
  productValidation,
  updatePointPostValidation,
  updatePointPutValidation,
  updatePostValidation,
  updatePutValidation,
} from "./modules/validation";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getUpdateById,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", getProductById);

router.post("/product", ...productValidation, createProduct);
router.put("/product/:id", ...productValidation, updateProduct);

router.delete("/product/:id", deleteProduct);

/**
 * Updates
 */
router.get("/update", getUpdates);
router.get("/update/:id", getUpdateById);

router.post("/update", ...updatePostValidation, createUpdate);
router.put("/update/:id", ...updatePutValidation, updateUpdate);

router.delete("/update/:id", deleteUpdate);

/**
 * Update Point
 */
router.get("/update-point", async (req, res) => {});
router.get("/update-point/:id", async (req, res) => {});

router.post(
  "/update-point",
  ...updatePointPostValidation,
  async (req, res) => {}
);
router.put(
  "/update-point/:id",
  ...updatePointPutValidation,
  async (req, res) => {}
);

router.delete("/update-point/:id", async (req, res) => {});

router.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "input error" });
  } else {
    res.status(500).json({ message: "server error" });
  }
});
export default router;
