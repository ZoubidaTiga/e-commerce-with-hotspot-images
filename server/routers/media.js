const express =require("express");
const router = express.Router();
const API = require ("../controllers/mediaAPI")
const upload = require('../middleware/upload')

router.post("/api/media/add",upload.single('image'),API.createMedia)

module.exports = router;