const express = require("express")
const router = express.Router()
const productController = require("../controllers/product.controller")
<<<<<<< HEAD
const {} = require
=======
const { validateProduct } = require("../middlewares/product.middleware")

router.post("/", validateProduct, productController.createProduct)
router.get("/", productController.getProducts)
router.get("/:productId", productController.getProductById)
router.put("/:productId", productController.updateProduct)
router.delete("/:productId", productController.deleteProduct)

module.exports = router
>>>>>>> 19a10d8afae11f494bbfd002469f96896dd6bbfe
