const { body } = require("express-validator")

exports.validateProduct = [
    body("name").notEmpty().isString().isLength({ min: 3, max: 50 }).withMessage("Name must be at lease 3 characters (max 50)"),
    body("description").notEmpty().isLength({ min: 10, max: 1000 }).withMessage("Description must be at least 10 characters (max 1000)"),
    body("price").notEmpty().isFloat({ min: 0 }).withMessage("Proce must be a positive number"),
    body("category").notEmpty().isIn(["machines", "tools", "materials"]).withMessage("Invalid category"),
    body("stock").notEmpty().isInt({ min: 0 }).withMessage("Stock must be a positive number"),
]