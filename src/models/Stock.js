const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    stockId: {
      type: String,
      required: true,
      unique: true
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", stockSchema);
