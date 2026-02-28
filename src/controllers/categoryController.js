const Category = require("../models/Category");

// CREATE CATEGORY (Admin)
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL CATEGORIES (Admin + Customer)
exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};
