const Stock = require("../models/Stock");

// ASSIGN ITEM TO SELLER (Admin)
exports.createStock = async (req, res) => {
  try {
    const stock = await Stock.create(req.body);
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ADMIN VIEW (JOINED DATA)
exports.getStockDetails = async (req, res) => {
  const stockData = await Stock.find()
    .populate("item")
    .populate("seller");

  res.json(stockData);
};
