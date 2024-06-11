const express = require("express");
const { ObjectId } = require("mongodb");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const orderCollection = client.db(process.env.DB_NAME).collection("order");

// Get all orders
router.get("/", asyncHandler(async (req, res) => {
  const orders = await orderCollection.find({}).toArray();
  res.json(orders);
}));

// Get order by ID
router.get("/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await orderCollection.findOne({ _id: new ObjectId(id) });
  res.json(order);
}));

// Create a new order
router.post("/", asyncHandler(async (req, res) => {
  const order = req.body;
  const result = await orderCollection.insertOne(order);
  res.json(result);
}));

// Update order by ID
router.put("/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const result = await orderCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: update },
    { upsert: true }
  );
  res.json(result);
}));

// Delete order by ID
router.delete("/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await orderCollection.deleteOne({ _id: new ObjectId(id) });
  res.json(result);
}));

module.exports = router;
