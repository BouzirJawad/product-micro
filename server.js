const express = require("express")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const app = express()
const PORT = process.env.PORT || 7461

app.post("/api/test", upload.single("file"), (req, res) => {
    res.send(req.file)
})

app.listen(PORT, ()=> {
    console.log(`Product micro-service is running on port ${PORT}`)
})