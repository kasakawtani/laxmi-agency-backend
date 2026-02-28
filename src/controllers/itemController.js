const Item = require("../models/Item");

// CREATE ITEM (ADMIN)
exports.createItem = async (req, res) => {
  try {
    // Ensure `detail` field is not stored from requests (frontend no longer sends it)
    const payload = { ...req.body };
    if (payload.hasOwnProperty('detail')) delete payload.detail;
    const item = new Item(payload);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving item" });
  }
};

// GET ITEMS (CUSTOMER)
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
};

// UPDATE ITEM (ADMIN)
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    // Prevent updating/storing the `detail` field via admin UI
    const payload = { ...req.body };
    if (payload.hasOwnProperty('detail')) delete payload.detail;
    const updated = await Item.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).json({ message: 'Error updating item' });
  }
};

// DELETE ITEM (ADMIN)
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Item.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ message: 'Error deleting item' });
  }
};
