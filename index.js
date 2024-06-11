const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Validate environment variables
const { DB_USER, DB_PASS, DB_NAME } = process.env;
if (!DB_USER || !DB_PASS || !DB_NAME) {
  console.error("Please set DB_USER, DB_PASS, and DB_NAME in your .env file");
  process.exit(1);
}

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.lse4v0n.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

// Routes
const packageRoutes = require("./routes/package");
const orderRoutes = require("./routes/order");

app.use("/package", packageRoutes);
app.use("/order", orderRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Running travelofun server");
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  connectToDatabase();
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  await client.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});
