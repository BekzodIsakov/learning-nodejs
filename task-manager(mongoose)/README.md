# What's Mongoose?

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It
provides a straightforward way to model your application data using schemas and
to work with MongoDB collections through an abstraction layer that simplifies
interactions with the database.

### Key features of Mongoose:

1. Schema-based modeling: Mongoose allows you to define a schema for your
   MongoDB collections, specifying the structure of documents in terms of
   fields, data types, validation, and default values.
2. Validation: You can enforce validation rules at the schema level to ensure
   that only valid data is saved to the database.
3. Middleware (Hooks): Mongoose provides middleware functionality that allows
   you to execute functions at certain points in the lifecycle of a document
   (e.g., before saving or updating).
4. Query building: Mongoose simplifies building complex queries by providing
   helper methods and chaining syntax to interact with MongoDB.
5. Population: It supports object references and allows you to populate
   documents with data from other collections, making relational data management
   easier.

### How Mongoose is related to MongoDB:

- MongoDB is a NoSQL database that stores data in a flexible, JSON-like format
  called BSON (Binary JSON).
- Mongoose acts as an interface between a MongoDB database and a Node.js
  application. It allows developers to work with structured data while still
  leveraging MongoDB's flexibility.

Mongoose helps abstract the low-level MongoDB commands, so you can work in a
more structured and intuitive way, using objects that represent your data and
focusing on higher-level logic.

#### Example relationship:

Without mongoose: 
<code> 
  const { MongoClient } = require('mongodb'); const
  client = new MongoClient('mongodb://localhost:27017');

  async function run() { try { await client.connect(); const database =
  client.db('myDatabase'); const users = database.collection('users'); const user
  = { name: 'John', age: 30 }; const result = await users.insertOne(user);
  console.log(result); } finally { await client.close(); } }

  run().catch(console.dir); 
</code>

With mongoose:
<code>
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost:27017/myDatabase');

  const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });

  const User = mongoose.model('User', userSchema);

  const user = new User({ name: 'John', age: 30 });
  user.save().then(() => console.log('User saved!'));
</code>
