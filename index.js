const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri=  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nlpzidc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect().then(() => {
    console.log("Connected to MongoDB successfully!");

    // Import and use routes
    const packageRoutes = require("./routes/packages")(client);
    const orderRoutes = require("./routes/orders")(client);

    app.use("/packages", packageRoutes);
    app.use("/orders", orderRoutes);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}).catch(error => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
});

// Default route for favicon (optional, to handle favicon error)
app.get("/", (req, res) => res.send('connected '));

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Travelofun server");
});
