const express = require("express");
const path = require("path");
const hbs = require("hbs");

const { geocode, forecast } = require("./utils");

require("dotenv").config();

const app = express();

// Use process.env.PORT if it's set (common in production environments),
// otherwise use 8080 (for development)
const PORT = process.env.PORT || 8080;

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
  const { location, unit = "m" } = req.query;

  if (!location) {
    return res.send({
      status: 400,
      message: "Forecast location not provided!",
    });
  }

  geocode(location, (error, data) => {
    if (error) {
      res.send({
        status: 502,
        message: error,
      });
    } else if (data) {
      const { latitude, longitude, location } = data;

      forecast(latitude, longitude, unit, (error, data) => {
        if (error) {
          res.send({
            status: 502,
            message: error,
          });
        } else if (data) {
          res.send({
            status: 200,
            ...data,
          });
        }
      });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  res.send({
    location: "Tashkent",
    forecast: 37,
    unit: "m",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    status: 404,
    title: "Page not found!",
  });
});

app.listen(PORT, () => {
  console.log(`The app is live on http://localhost:${PORT}`);
});
