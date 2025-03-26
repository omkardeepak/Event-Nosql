// lib/mongodb.js
import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = "mongodb://omkardeepak444:hamburg4738@ac-vpsazmx-shard-00-00.qwbppwf.mongodb.net:27017,ac-vpsazmx-shard-00-01.qwbppwf.mongodb.net:27017,ac-vpsazmx-shard-00-02.qwbppwf.mongodb.net:27017/?replicaSet=atlas-gx1abo-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";  // Store your connection string in environment variables
  const client = new MongoClient(uri); // No need for options like useNewUrlParser or useUnifiedTopology


  await client.connect();
  const db = client.db("feedback");  // Replace with your database name

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
