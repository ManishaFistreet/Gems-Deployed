const express = require("express");
const router = express.Router();
const SalesItem = require("../models/salesItem");
const CustomerItem = require("../models/customerItem");

// Sales - only POST and GET
router.post("/sales", async (req, res) => {
  try {
    const newItem = new SalesItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/sales", async (req, res) => {
  try {
    const items = await SalesItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Customer - Full CRUD
router.post("/customers", async (req, res) => {
  try {
    const newItem = new CustomerItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/customers", async (req, res) => {
  try {
    const items = await CustomerItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/customers/:id", async (req, res) => {
  try {
    const updated = await CustomerItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/customers/:id", async (req, res) => {
  try {
    await CustomerItem.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;