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

exports.getSalesItemById = async (req, res) => {
  try {
    const item = await SalesItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSalesItem = async (req, res) => {
  try {
    const item = await SalesItem.findByIdAndUpdate
      (req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSalesItem = async (req, res) => {
  try {
    const deletedItem = await SalesItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Delete associated PDF file
    const pdfPath = path.join(__dirname, "../pdfs", `${deletedItem.item_number}.pdf`);
    if (fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }

    res.status(200).json({ message: "Sales item and PDF deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }};