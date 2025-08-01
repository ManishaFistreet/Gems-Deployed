const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  type: { type: String, enum: ['gemstone', 'diamond', 'rudraksha'], required: true },
  certificateNo: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  color: String,
  purity: String,
  shapesAndCut: String,
  dimensions: String,
  opticCharacter: String,
  specificGravity: String,
  refractiveIndex: String,
  speciesGroup: String,
  comment: String,
  issuedTo: String,
  photo: String,
  cut: String,
  clarity: String,
  caratWt: String,
  description: String,
  shape: String,
  naturalFaces: String,
  weight: String,
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);