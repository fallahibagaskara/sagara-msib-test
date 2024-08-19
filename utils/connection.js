import { config } from 'dotenv';
import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';

config({ path: path.resolve(process.cwd(), '.env') });

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();

    const database = client.db("sagara");

    await database.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    return database.collection('clothes');
  } catch {
    console.error("Failed to connect to the database:", err);
  }
}

export default connectToDatabase;