const express = require("express");
const router = express.Router();
const {
  createSalesItem,
  getAllSalesItems,
  getSalesItemById,
  updateSalesItem,
  deleteSalesItem
} = require("../controllers/salesController");

router.post("/", createSalesItem);           
router.get("/", getAllSalesItems);         
router.get("/:id", getSalesItemById); 
router.put("/:id", updateSalesItem);
router.delete("/:id", deleteSalesItem);

module.exports = router;