const { MongoClient } = require("mongodb");
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

async function connectToDatabase() {
  try {
    const client = new MongoClient(connectionURL);
    await client.connect();
    console.log("Connected correctly");

    const db = client.db(databaseName);
    db.collection("users").insertOne({
      name: "Yusuf",
      age: 30,
    });
  } catch (error) {
    console.log("Unable to connect to database:", error);
  } finally {
    if (client) {
      await client.close();
      console.log("Connection closed");
    }
  }
}

connectToDatabase();
