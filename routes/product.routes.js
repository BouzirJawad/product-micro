const express = require("express")
const router = express.Router()
const productController = require("../controllers/product.controller")
const { validateProduct } = require("../middlewares/product.middleware")

router.post("/", validateProduct, productController.createProduct)
router.get("/", productController.getProducts)
router.get("/:productId", productController.getProductById)
router.put("/:productId", productController.updateProduct)
router.delete("/:productId", productController.deleteProduct)

module.exports = router