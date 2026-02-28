const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    detail: {
      type: String
    },
    supplierName: {
      type: String
    },
    contact: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
