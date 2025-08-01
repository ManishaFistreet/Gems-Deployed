const express = require("express");
const router = express.Router();
const { createItem, getAllItemsWithCustomer } = require("../controllers/itemController");

router.post("/", createItem); 
router.get("/", getAllItemsWithCustomer); 

module.exports = router;
