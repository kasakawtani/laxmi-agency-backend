const Inquiry = require("../models/Inquiry");

// CREATE INQUIRY (PUBLIC)
exports.createInquiry = async (req, res) => {
  try {
    const { name, contactNumber, brand, message } = req.body;

    // Validate required fields
    if (!name || !contactNumber || !message) {
      return res.status(400).json({ message: "Name, contact number, and message are required." });
    }

    const inquiry = new Inquiry({
      name,
      contactNumber,
      brand: brand || null,
      message,
    });

    await inquiry.save();
    res.status(201).json({ message: "Inquiry submitted successfully", data: inquiry });
  } catch (err) {
    console.error("Error creating inquiry:", err);
    res.status(500).json({ message: "Error saving inquiry" });
  }
};

// GET ALL INQUIRIES (ADMIN)
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    console.error("Error fetching inquiries:", err);
    res.status(500).json({ message: "Error fetching inquiries" });
  }
};

// DELETE INQUIRY (ADMIN)
exports.deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Inquiry.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.json({ message: "Inquiry deleted successfully" });
  } catch (err) {
    console.error("Error deleting inquiry:", err);
    res.status(500).json({ message: "Error deleting inquiry" });
  }
};
