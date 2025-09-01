const express = require("express")
const connectDB = require("./config/db")
const productRoutes = require("./routes/product.routes")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 7461

app.use(express.json())

connectDB()

app.use("/api/products", productRoutes)

app.listen(PORT, ()=> {
    console.log(`Product micro-service is running on port ${PORT}`)
})