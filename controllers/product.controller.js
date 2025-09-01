const Product = require("../models/Product");
const { validationResult } = require("express-validator");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// const getPublicId = (imageUrl) => {
//   const parts = imageUrl.split("/");
//   const filename = parts[parts.length - 1];
//   const publicId = filename.split(".")[0];
//   return `products/${publicId}`;
// };

const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }

  try {
    const { name, description, price, category, stock } = req.body;
    const product = await Product.findOne({ name });

    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    fs.unlinkSync(req.file.path);

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      image: result.secure_url,
      imagePublicId: result.public_id,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully!", product: newProduct });
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
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    let updatedData = { ...req.body };

    if (req.file && req.file.path) {
      if (product.image && product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });

      fs.unlinkSync(req.file.path);

      updatedData.image = result.secure_url;
      updatedData.imagePublicId = result.public_id;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true, runValidators: true }
    );

    res
      .status(201)
      .json({
        message: "Product updated successfully!",
        updatedProduct: updatedProduct,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(500).json({ message: "Product not found!" });
    }

    if (product.image && product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await Product.findByIdAndDelete(productId);
    res.status(201).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
