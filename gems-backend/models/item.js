// models/Item.js
const mongoose = require("mongoose");

const stoneSchema = new mongoose.Schema({
  name: String,
  category: String,
  weight: Number,
  quantity: Number,
  price: Number,
});

const baseItemSchema = new mongoose.Schema({
  item_number: String,
  item_name: String,
  size: String,
  metal: String,
  purity: String,
  gross_weight: Number,
  weight_adjustment: Number,
  weight_adjustment_note: String,
  net_weight: Number,
  number_of_stones: Number,
  product_name: String,
  item_pic: String,
  stones: [stoneSchema],
  labour_charges: Number,
  kundan: Number,
  beads: Number,
  hallmark: Number,
  additional_charges: Number,
  metal_rate_per_gram: Number,
}, {
  timestamps: true,
  discriminatorKey: "type",
});

module.exports = mongoose.model("Item", baseItemSchema);