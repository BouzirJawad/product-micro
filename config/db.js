const mongoose = require("mongoose")

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(()=> console.log("Product-Manager connected"))
    } catch (error) {
        console.log("Error connecting product database", error)
    }
}

