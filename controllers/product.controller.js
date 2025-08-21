const Product = require("../models/Product");
const { validationResult } = require("express-validator");

const createProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    const product = await Product.find({ name: name });

    if (product) {
      return res.status(404).json({ message: "Product already exists" });
    }
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).josn({ message: "Product created successfully!", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products to display" });
    }

    res.status(201).json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
    const { productId } = req.params
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          { $set: req.body },
          { new: true, runValidators: true }
        )

        if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found!"})
        }
        res.status(201).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId)

    if (!product) {
      return res.status(500).json({ message: "Product not found!"})
    }

    await Product.findByIdAndDelete(productId)
    res.status(201).json({ message: "Product deleted successfully"})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
