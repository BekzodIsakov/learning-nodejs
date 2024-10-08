const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { log } = require("console");

const app = express();

const PORT = 8080;

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    subtitle: "Weather service written in Node.js",
  });
});

app.get("/forecast", (req, res) => {
  const { location } = req.query;

  if (!location) {
    res.send({
      status: 400,
      message: "Forecast location not provided!",
    });
  }

  res.send({
    forecast: 37,
    unit: "m",
    location,
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    status: 404,
    title: "Page not found!",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    location: "Tashkent",
    forecast: 37,
    unit: "m",
  });
});

app.listen(PORT, () => {
  console.log(`The app is live on http://localhost:${PORT}`);
});
