const { geocode, forecast } = require("./utils");

const location = process.argv[2];

if (!location) {
  console.log("\x1b[35m%s\x1b[0m", "Please provide a location!");
} else {
  geocode(location, (error, data) => {
    if (error) {
      console.log("\x1b[35m%s\x1b[0m", error);
    } else if (data) {
      const { latitude, longitude, location } = data;

      forecast(latitude, longitude, (error, data) => {
        if (error) {
          console.log("\x1b[35m%s\x1b[0m", error);
        } else if (data) {
          console.log("\x1b[36m", data);
        }
      });
    }
  });
}
