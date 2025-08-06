// routes/pdf.js
const express = require("express");
const PDFDocument = require("pdfkit");
const QRCode = require("qr-image");
const router = express.Router();
const Item = require("../models/item");
const Product = require("../models/product");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, "../pdfs");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({ dest: uploadDir });

router.post('/upload-pdf', upload.single('file'), (req, res) => {
    const oldPath = req.file.path;
    const newFilename = req.file.originalname;
    const newPath = path.join(uploadDir, newFilename);

    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error("Rename failed", err);
            return res.status(500).send("Failed to save");
        }
        res.send({ message: "Uploaded", url: `/pdf/${newFilename}` });
    });
});

router.get("/pdf/:itemNumber", async (req, res) => {
    try {
        const item = await Item.findOne({ item_number: req.params.itemNumber }).populate("customer");
        if (!item) return res.status(404).send("Item not found");

        const doc = new PDFDocument();
        res.setHeader("Content-Disposition", `inline; filename="${item.item_number}.pdf"`);
        res.setHeader("Content-Type", "application/pdf");

        doc.fontSize(20).text("Item Label", { align: "left" });

        doc.moveDown();
        doc.fontSize(12).text(`Item Name: ${item.item_name}`);
        doc.text(`Item Number: ${item.item_number}`);
        doc.text(`Net Weight: ${item.net_weight}`);
        doc.text(`Gross Weight: ${item.gross_weight}`);
        doc.text(`Metal Rate: ${item.metal_rate_per_gram}`);
        doc.text(`Labour Charges: ${item.labour_charges}`);

        if (item.customer) {
            doc.moveDown().fontSize(14).text("Customer Details:");
            doc.fontSize(12).text(`Name: ${item.customer.name}`);
            doc.text(`Phone: ${item.customer.phone}`);
            doc.text(`City: ${item.customer.city}`);
        }

        doc.moveDown();
        doc.text("QR Code:");
        const qr = QRCode.imageSync(item.item_number, { type: "png" });
        doc.image(qr, doc.x, doc.y, { width: 100 });

        doc.end();
        doc.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to generate PDF");
    }
});

router.get("/pdf/:certificateNo", async (req, res) => {
    try {
        const item = await Product.findOne({ certificateNo: req.params.certificateNo });
        if (!item) return res.status(404).send("Certificate not found");

        const doc = new PDFDocument();
        res.setHeader("Content-Disposition", `inline; filename="Card-${item.name}.pdf"`);
        res.setHeader("Content-Type", "application/pdf");

        doc.fontSize(18).text("Gem Certificate", { align: "center" });
        doc.moveDown();

        Object.entries(item.toObject()).forEach(([key, value]) => {
            if (key !== "photo") {
                doc.fontSize(12).text(`${key}: ${value}`);
            }
        });

        doc.end();
        doc.pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).send("PDF generation failed");
    }
});

module.exports = router;