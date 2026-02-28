const Seller = require("../models/Seller");

// CREATE SELLER (Admin)
exports.createSeller = async (req, res) => {
  try {
    const seller = await Seller.create(req.body);
    res.status(201).json(seller);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET SELLERS (Admin)
exports.getSellers = async (req, res) => {
  const sellers = await Seller.find();
  res.json(sellers);
};
