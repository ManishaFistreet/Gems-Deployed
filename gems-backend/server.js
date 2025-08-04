const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const itemRoutes = require("./controllers/itemController");
const salesItemRoutes = require("./routes/salesRoutes");
const customerItemRoutes = require("./routes/customerRoute");
const authRoutes = require('./routes/auth');
const pdfRoutes = require("./routes/pdf");

const app = express();
const PORT = process.env.PORT || 4005;

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/products", productRoutes);
app.use("/api/items", itemRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/sales", salesItemRoutes);       
app.use("/api/customers", customerItemRoutes);
app.use("/api", pdfRoutes);
app.use('/pdf', express.static('/app'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});