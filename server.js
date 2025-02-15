const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// ✅ 4. Add body parser
app.use(express.json());

// ✅ 5. Add routes BEFORE static files
app.post("/report", async (req, res) => {
    try {
        const newReport = new Report(req.body);
        await newReport.save();
        res.status(201).json({ message: "Report submitted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error submitting report" });
    }
});

// ✅ 6. Static files AFTER routes
app.use(express.static(__dirname));

// ✅ 7. MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// ✅ 8. Define Report model
const Report = mongoose.model("Report", new mongoose.Schema({
    type: String,
    location: String,
    description: String,
    status: { type: String, default: "Pending" }
}));

// ✅ 9. Add missing GET route for issues
app.get("/issues", async (req, res) => {
    try {
        const issues = await Report.find();
        res.json(issues);
    } catch (error) {
        res.status(500).json({ message: "Error fetching issues" });
    }
});

// ✅ 10. Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});