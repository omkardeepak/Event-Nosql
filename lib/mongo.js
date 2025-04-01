import { MongoClient } from "mongodb";


let cachedClient = null;
let cachedDb = null;

// Connect to MongoDB Atlas
export async function connectToDatabase(dbName = "feedback") {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }
    const uri = "mongodb://omkardeepak444:hamburg4738@ac-vpsazmx-shard-00-00.qwbppwf.mongodb.net:27017,ac-vpsazmx-shard-00-01.qwbppwf.mongodb.net:27017,ac-vpsazmx-shard-00-02.qwbppwf.mongodb.net:27017/?replicaSet=atlas-gx1abo-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"; 
    const client = new MongoClient(uri, {
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000,
    });

    await client.connect();
    const db = client.db(dbName); // Creates DB dynamically if it doesn’t exist

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}
