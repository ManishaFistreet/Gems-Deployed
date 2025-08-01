const SalesItem = require("../models/salesItem");

exports.createSalesItem = async (req, res) => {
  try {
    const newItem = new SalesItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSalesItems = async (req, res) => {
  try {
    const items = await SalesItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};