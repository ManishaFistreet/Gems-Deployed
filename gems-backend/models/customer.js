const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String },
  purchased_item: { type: mongoose.Schema.Types.ObjectId, ref: "CustomerItem" },
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);