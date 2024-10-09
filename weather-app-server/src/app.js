const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { geocode, forecast } = require("./utils");

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
  const { location, unit = "m" } = req.query;

  if (!location) {
    return res.send({
      status: 400,
      message: "Forecast location not provided!",
    });
  }

  // if (!location) {
  //   console.log("\x1b[35m%s\x1b[0m", "Please provide a location!");
  // } else {
  //   geocode(location, (error, data) => {
  //     if (error) {
  //       console.log("\x1b[35m%s\x1b[0m", error);
  //     } else if (data) {
  //       const { latitude, longitude, location } = data;

  //       forecast(latitude, longitude, (error, data) => {
  //         if (error) {
  //           console.log("\x1b[35m%s\x1b[0m", error);
  //         } else if (data) {
  //           console.log("\x1b[36m", data);
  //         }
  //       });
  //     }
  //   });
  // }

  geocode(location, (error, data) => {
    if (error) {
      res.send({
        status: 502,
        error,
      });
    } else if (data) {
      const { latitude, longitude, location } = data;

      forecast(latitude, longitude, unit, (error, data) => {
        if (error) {
          res.send({
            status: 502,
            error,
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

  // res.send({
  //   forecast: 37,
  //   unit: "m",
  //   location,
  // });
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
