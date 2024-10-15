const { MongoClient, ObjectId } = require("mongodb");
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

async function connectToDatabase() {
  try {
    const client = new MongoClient(connectionURL);
    await client.connect();
    console.log("Connected correctly!");

    const db = client.db(databaseName);
    const collection = db.collection("tasks");

    // ------ create 4 items and log last inserted tasks and completed tasks

    // const result = await collection.insertMany([
    //   {
    //     task: "Learn Mongodb",
    //     completed: false,
    //   },
    //   {
    //     task: "Learn React",
    //     completed: true,
    //   },
    //   {
    //     task: "Have lunch",
    //     completed: true,
    //   },
    //   {
    //     task: "Have dinner",
    //     completed: false,
    //   },
    // ]);

    // // Fetch the inserted documents
    // const lastTask = await collection.findOne({
    //   _id: new ObjectId(Object.values(result.insertedIds).pop()),
    // });

    // const completedTasks = await collection.find({ completed: true }).toArray();
    // console.log({ lastTask, completedTasks });

    // ----- update a task
    // const result = await collection.updateOne(
    //   { task: "Learn Mongodb" },
    //   { $set: { task: "Learn Mongodb" } },
    //   { returnDocument: "after" }
    // );
    // console.log(result);

    // ----- update a task
    // update all tasks
    // const result = await collection.updateMany(
    //   {},
    //   { $set: { completed: true } }
    // );
    // console.log(result);

    // ----- delete a task
    const result = await collection.deleteOne({ task: "Have dinner" });
    console.log(result);
  } catch (error) {
    console.log("Unable to connect to database:", error);
  }
}

connectToDatabase();
