const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.WEATHER_SERVICE_DB_URI;
const client = new MongoClient(uri,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    tlsAllowInvalidCertificates: true, });

let dbInstance = null;


async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
async function connectToDatabase() {
  if (!dbInstance) {
    try {
      await client.connect();
      console.log("Connected to MongoDB!");
      dbInstance = client.db("WeatherService");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
    }
  }
  return dbInstance;
}

process.on("SIGINT", async () => {
  await client.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});

module.exports = { connectToDatabase, client };
