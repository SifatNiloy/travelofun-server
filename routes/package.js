const express = require("express");
const { ObjectId } = require("mongodb");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const packageCollection = client.db(process.env.DB_NAME).collection("packages");

// Get all packages
router.get("/", asyncHandler(async (req, res) => {
  const packages = await packageCollection.find({}).toArray();
  res.json(packages);
}));

// Get package by ID
router.get("/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const package = await packageCollection.findOne({ _id: new ObjectId(id) });
  res.json(package);
}));

// Create a new package
router.post("/", asyncHandler(async (req, res) => {
  const newPackage = req.body;
  const result = await packageCollection.insertOne(newPackage);
  res.json(result);
}));

// Delete package by ID
router.delete("/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await packageCollection.deleteOne({ _id: new ObjectId(id) });
  res.json(result);
}));

module.exports = router;
