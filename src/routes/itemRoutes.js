const express = require("express");
const router = express.Router();
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

router.post("/", createItem);      // admin save
router.get("/", getItems);         // customer view
router.put("/:id", updateItem);    // admin update
router.delete("/:id", deleteItem); // admin delete

module.exports = router;
