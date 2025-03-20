import { MongoClient } from 'mongodb';

// Replace with your MongoDB URI directly
const uri = 'your-mongodb-uri-here';
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error("mongodb://localhost:27017/local");
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, reuse the MongoClient instance to avoid connection issues
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new MongoClient
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
