import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const databaseURL = process.env.DATABASE_URL;
const mongoClient = new MongoClient(databaseURL);

try {
    await mongoClient.connect();
    console.log("Mongodb conectado!");
} catch (error) {
    console.log(error.message);
}

export const db = mongoClient.db();
