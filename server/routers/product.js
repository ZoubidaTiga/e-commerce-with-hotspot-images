const express =require("express");
const router = express.Router();
const API = require ("../controllers/product")
const upload = require('../middleware/upload')

router.get("/api/product/",API.fetchAllProducts)
router.get("/api/product/:id",API.fetchProductById)
router.post("/api/product/",upload.single('image'),API.createProduct)
router.delete("/api/product/:id",API.DeleteProduct)
router.patch("/api/product/:id",upload.single('image'),API.UpdateProduct);


module.exports = router;