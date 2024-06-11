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
            const { id } = req.params;
            const package = await packageCollection.findOne({ _id: new ObjectId(id) });
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
            const result = await packageCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: update },
                { upsert: true }
            );
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
            const result = await packageCollection.deleteOne({ _id: new ObjectId(id) });
            res.json(result);
        } catch (error) {
            console.error("Error deleting package:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};
