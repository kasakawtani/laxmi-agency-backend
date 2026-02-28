const express = require("express");
const router = express.Router();
const {
  createSeller,
  getSellers
} = require("../controllers/sellerController");

router.post("/", createSeller);
router.get("/", getSellers);

module.exports = router;
