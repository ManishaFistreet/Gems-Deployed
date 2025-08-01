const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('Login', loginSchema);