import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

// console.log("The connection string is ---------"+connectionString);

const client = new MongoClient(connectionString);

async function connectToDatabase() {
  let conn;
  try {
    conn = await client.connect();
  } catch (e) {
    console.error(e);
  }

  let db = conn.db("GoTo");

  return db;
}

export default connectToDatabase;
// module.exports = connectToDatabase();