const express = require("express");
const router = express.Router();
const {
  createStock,
  getStockDetails
} = require("../controllers/stockController");

router.post("/", createStock);
router.get("/", getStockDetails);

module.exports = router;
