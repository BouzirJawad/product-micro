const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Product name is required"],
        minLength: 3,
        maxLength: 50,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxLength: 1000,
    }, 
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: 0,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["machines", "tools", "materials"],
    },
    image: {
        type: String,
        required: [true, "Image is required"],
    },
    imagePublicId: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    }
}, { timestamps: true })
const productModel = mongoose.model('Product', productSchema)
module.exports = productModel