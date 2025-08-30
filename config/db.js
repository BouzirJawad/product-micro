const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(()=> console.log("Product-Manager connected"))
    } catch (error) {
        console.log("Error connecting product database", error)
    }
}

module.exports = connectDB