const express = require("express");
const router = express.Router();
const {
  createCustomerItem,
  getAllCustomerItems,
  updateCustomerItem,
  deleteCustomerItem,
  getCustomersWithPurchasedItems,
} = require("../controllers/customerController");

router.post("/", createCustomerItem);           
router.get("/", getAllCustomerItems);      
router.get("/purchased-customers", getCustomersWithPurchasedItems);
router.put("/:id", updateCustomerItem);            
router.delete("/:id", deleteCustomerItem);         
module.exports = router;