const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();


//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lse4v0n.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const packageCollection = client.db('travelofun').collection('packages');
        const orderCollection = client.db('travelofun').collection('order');

        app.get('/package', async (req, res) => {
            const query = {};
            const cursor = packageCollection.find(query);
            const packages = await cursor.toArray();
            res.send(packages);
        })
        app.get('/package/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const package = await packageCollection.findOne(query);
            res.send(package);
        })
        //post 
        app.post('/package', async (req, res) => {
            const newPackage = req.body;
            const result = await packageCollection.insertOne(newPackage);
            res.send(result);
        })

        //update status
        app.get('/order', async (req, res) => {
            const query = {};
            const cursor = orderCollection.find(query);
            const order = await cursor.toArray();
            res.send(order);
        })
        app.get('/order/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const order = await orderCollection.findOne(query);
            res.send(order);
        })
        app.put('/order/:id', async (req, res) => {
            const id = req.params.id;
            const order = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updateDoc = {
                $set: {
                    id: order._id,
                    email: order.email,
                    packagename: order.packagename,
                    image: order.image,
                    description: order.description,
                    price: order.price,
                    duration: order.duration,
                    packageId:order.packageId,
                    status: order.status,

                }
            };
            const result = await orderCollection.updateOne(filter, updateDoc, options);
            res.send(result);

        })

        //delete
        app.delete("/package/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await packageCollection.deleteOne(query);
            res.send(result);
        })
        //delete order
        app.delete("/order/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query);
            res.send(result);
        })

        //order collection api
        app.get('/order', async (req, res) => {
            // const email=req.query.email;
            const query = {};
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        })

        app.post('/order', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })


    }



    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('running travelofun server')
})

app.listen(port, () => {
    console.log('listening to port', port);
})