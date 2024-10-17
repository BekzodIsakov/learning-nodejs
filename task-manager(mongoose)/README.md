## What's Mongoose?

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

Without mongoose: <code> const { MongoClient } = require('mongodb'); const
client = new MongoClient('mongodb://localhost:27017');

async function run() { try { await client.connect(); const database =
client.db('myDatabase'); const users = database.collection('users'); const user
= { name: 'John', age: 30 }; const result = await users.insertOne(user);
console.log(result); } finally { await client.close(); } }

run().catch(console.dir); </code>

With mongoose: <code> const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDatabase');

const userSchema = new mongoose.Schema({ name: String, age: Number, });

const User = mongoose.model('User', userSchema);

const user = new User({ name: 'John', age: 30 }); user.save().then(() =>
console.log('User saved!')); </code>

## What's REST API?

A REST API (Representational State Transfer Application Programming Interface)
is a way for systems to communicate over the web using standard HTTP methods.
REST is a popular architectural style for designing networked applications and
emphasizes a stateless, client-server communication model where each request
from the client contains all the information needed to process the request,
independent of previous requests.

Here are the key components of a REST API:

1. Resources:

- Resources are the key data or entities that the API exposes, such as users,
  products, or orders. Each resource is identified by a unique URL (Uniform
  Resource Locator).
- For example, in an e-commerce application, a product might be represented as
  /products/123, where 123 is the unique ID of the product.

2. HTTP Methods: REST APIs use standard HTTP methods to perform actions on
   resources:

- <b>GET</b>: Retrieve data from the server (e.g., get a list of users or a
  single user).
- <b>POST</b>: Create a new resource on the server (e.g., add a new user).
- <b>PUT</b> or PATCH: Update an existing resource (e.g., update user details).
- <b>DELETE</b>: Remove a resource (e.g., delete a user).

3. Stateless Communication:

- REST is stateless, meaning each API call is independent, and the server
  doesn't store client information between requests. All necessary information
  (like authentication tokens) must be included in each request.

4. HTTP Status Codes: REST APIs use standard HTTP status codes to indicate the
   result of the request. For example:

- <b>200 OK</b>: Request was successful.
- <b>201 Created</b>: A new resource was successfully created.
- <b>404 Not Found</b>: The requested resource does not exist.
- <b>500 Internal Server Error</b>: Something went wrong on the server.

5. Data Formats: REST APIs typically use JSON (JavaScript Object Notation) or
   XML as the format for data exchange, with JSON being the most common.

Example of a JSON response from a REST API: <code> { "id": 1, "name": "John
Doe", "email": "john@example.com" } </code>

### Example of a REST API:

Let's assume you have an API to manage blog posts:

- GET /posts – Retrieves a list of blog posts.
- GET /posts/1 – Retrieves the blog post with ID 1.
- POST /posts – Creates a new blog post.
- PUT /posts/1 – Updates the blog post with ID 1.
- DELETE /posts/1 – Deletes the blog post with ID 1.

### Advantages of REST:

- Scalability: Statelessness allows REST services to scale well.
- Flexibility: REST APIs can be consumed by various clients (web browsers,
  mobile apps).
- Use of standard protocols: Built on HTTP, which is widely understood and used.

### Disadvantages:

- Overhead: Each request must contain all the information necessary to process
  it.
- No real-time capabilities: REST APIs are request-response based, so they may
  not be ideal for real-time applications.

REST is widely used for web APIs because of its simplicity, scalability, and
flexibility.
