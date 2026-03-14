import { MongoClient, ServerApiVersion } from "mongodb";


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yenp2b1.mongodb.net/?appName=Cluster0`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  await client.connect();
  console.log("✅ Connected to MongoDB");
};

const getDB = () => client.db("VrboMarkDB");

const closeDB = async () => {
  await client.close();
  console.log("🔌 MongoDB connection closed.");
};

export { connectDB, getDB, closeDB };