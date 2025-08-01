const CustomerItem = require("../models/customerItem");

exports.createCustomerItem = async (req, res) => {
  try {
    const newItem = new CustomerItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCustomerItems = async (req, res) => {
  try {
    const items = await CustomerItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCustomerItem = async (req, res) => {
  try {
    const updated = await CustomerItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCustomerItem = async (req, res) => {
  try {
    await CustomerItem.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCustomersWithPurchasedItems = async (req, res) => {
  try {
    const customerItems = await CustomerItem.find({ customer_name: { $ne: null } })
      .sort({ createdAt: -1 });

    res.status(200).json(customerItems);
  } catch (err) {
    console.error("Error fetching customers with purchased items:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};