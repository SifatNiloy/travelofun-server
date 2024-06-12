const express = require("express");
const { ObjectId } = require("mongodb");

module.exports = (client) => {
  const router = express.Router();
  const packageCollection = client.db("travelofun").collection("packages");

  // Get all packages
  router.get("/", async (req, res) => {
    try {
      const packages = await packageCollection.find({}).toArray();
      console.log("Fetched packages:", packages);
      res.json(packages);
    } catch (error) {
      console.error("Error fetching packages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Create a new package
  router.post("/", async (req, res) => {
    try {
      const newPackage = req.body;
      const result = await packageCollection.insertOne(newPackage);
      res.json(result.ops[0]);
    } catch (error) {
      console.error("Error creating package:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Get package by ID
  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      const package = await packageCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!package) {
        return res.status(404).json({ error: "Package not found" });
      }
      res.json(package);
    } catch (error) {
      console.error("Error fetching package by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  // Update package by ID
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const update = req.body;

      // Check if id is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ObjectId" });
      }

      const objectId = new ObjectId(id);
      const result = await packageCollection.updateOne(
        { _id: objectId },
        { $set: update },
        { upsert: true }
      );
      console.log("Update result:", result);
      res.json(result);
    } catch (error) {
      console.error("Error updating package:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Delete package by ID
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      // Check if id is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ObjectId" });
      }

      const objectId = new ObjectId(id);
      const result = await packageCollection.deleteOne({ _id: objectId });
      console.log("Delete result:", result);
      res.json(result);
    } catch (error) {
      console.error("Error deleting package:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
};
