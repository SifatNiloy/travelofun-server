const express = require("express");
const { ObjectId } = require("mongodb");

module.exports = (client) => {
    const router = express.Router();
    const orderCollection = client.db("travelofun").collection("orders");

    // Get all orders
    router.get("/", async (req, res) => {
        try {
            const orders = await orderCollection.find({}).toArray();
            console.log("Fetched orders:", orders);
            res.json(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // Create a new order
    router.post("/", async (req, res) => {
        try {
            const newOrder = req.body;
            const result = await orderCollection.insertOne(newOrder);
            res.json(result.ops[0]);
        } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // Get order by ID
    router.get("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const order = await orderCollection.findOne({ _id: new ObjectId(id) });
            if (!order) {
                return res.status(404).json({ error: "Order not found" });
            }
            res.json(order);
        } catch (error) {
            console.error("Error fetching order by ID:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // Update order by ID
    router.put("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const update = req.body;
            const result = await orderCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: update },
                { upsert: true }
            );
            res.json(result);
        } catch (error) {
            console.error("Error updating order:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // Delete order by ID
    router.delete("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const result = await orderCollection.deleteOne({ _id: new ObjectId(id) });
            res.json(result);
        } catch (error) {
            console.error("Error deleting order:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};
