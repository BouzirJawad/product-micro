const { body } = require("express-validator")

exports.validateProduct = [
    body("name").isString().isLength({ min: 3, max: 50 }).withMessage("Name must be at lease 3 characters (max 50)"),
    body("description").isLength({ min: 10, max: 1000 }).withMessage("Description must be at least 10 characters (max 1000)"),
    body("price").isFloat({ min: 0 }).withMessage("Proce must be a positive number"),
    body("category").isIn(["machines", "tools", "materials"]).withMessage("Invalid category"),
    body("stock").isInt({ min: 0 }).withMessage("Stock must be a positive number"),
]