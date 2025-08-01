const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get('/by-certificate/:certificateNo', productController.getProductByCertificateNo);

module.exports = router;