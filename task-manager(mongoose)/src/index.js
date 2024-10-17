const express = require("express");
require("./mongoose.js");

const { usersRouter, tasksRouter } = require("./routers");

const port = process.env.PORT || 8080;
app = express();

app.use(express.json());
app.use(usersRouter);
app.use(tasksRouter);

app.listen(port, () => {
  console.log("Server is live on port " + port);
});
