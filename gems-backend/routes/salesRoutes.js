const express = require("express");
const router = express.Router();
const {
  createSalesItem,
  getAllSalesItems,
} = require("../controllers/salesController");

router.post("/", createSalesItem);           
router.get("/", getAllSalesItems);          

module.exports = router;