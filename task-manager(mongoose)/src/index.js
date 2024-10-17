const express = require("express");
const { usersRouter, tasksRouter } = require("./routers");
require("./mongoose.js");

const port = process.env.PORT || 8080;
app = express();

app.use(express.json());
app.use(usersRouter);
app.use(tasksRouter);

app.listen(port, () => {
  console.log("Server is live on port " + port);
});
