const express = require("express");
const router = express.Router();
const {
  createInquiry,
  getInquiries,
  deleteInquiry,
} = require("../controllers/inquiryController");

router.post("/", createInquiry);      // public - submit inquiry
router.get("/", getInquiries);        // admin - view all inquiries
router.delete("/:id", deleteInquiry); // admin - delete inquiry

module.exports = router;
