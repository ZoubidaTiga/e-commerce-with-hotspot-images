const express =require("express");
const router = express.Router();
const API = require ("../controllers/collectionApi")
const upload = require('../middleware/upload')

router.get("/api/collection/",API.fetchAllCollections)
router.get("/api/collection/:id",API.fetchCollectionById)
router.post("/api/collection/",upload.single('image'),API.createCollection)
router.delete("/api/collection/delete/:id",API.DeleteCollection)
router.patch("/api/collection/update/:id",upload.single('image'),API.UpdateCollection); 
router.get("/api/collection/product/:productId",API.getByProduct);

module.exports = router;