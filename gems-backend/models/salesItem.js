const mongoose = require("mongoose");

const stoneSchema = new mongoose.Schema({
  name: String,
  category: String,
  weight: Number,
  quantity: Number,
  price: Number,
});

const salesItemSchema = new mongoose.Schema({
  item_number: {
    type: String,
    required: true,
    unique: true,
  },
  item_name: {
    type: String,
    required: true,
  },
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
}, { timestamps: true });

module.exports = mongoose.model("SalesItem", salesItemSchema);