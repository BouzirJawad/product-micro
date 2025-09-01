const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { validateProduct } = require("../middlewares/product.middleware");
const upload = require("../middlewares/upload");

router.post(
  "/",
  upload.single("image"),
  validateProduct,
  productController.createProduct
);
router.get("/", productController.getProducts);
router.get("/:productId", productController.getProductById);
router.put("/:productId", validateProduct, productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
