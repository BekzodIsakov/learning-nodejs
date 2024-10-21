const express = require("express");
const { usersRouter, tasksRouter } = require("./routers");
require("./mongoose.js");

const port = process.env.PORT || 8080;
app = express();

app.use(express.json());
app.use(usersRouter);
app.use(tasksRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging purposes
  res.status(500).send({
    message: err.message || "An internal error occurred.",
  });
});

app.listen(port, () => {
  console.log("Server is live on port " + port);
});
