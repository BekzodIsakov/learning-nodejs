const request = require("postman-request");

function forecast(latitude, longitude, callback) {
  const WEATHERSTACK_ACCESS_KEY = "e416bc52c2535b275b33681132e10f05";

  const WEATHERSTACK_URL = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_ACCESS_KEY}&query=${latitude}, ${longitude}`;

  request({ url: WEATHERSTACK_URL, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to weather service!", null);
    } else if (body.error) {
      callback("Unable to find location!", null);
    } else {
      const { name, country } = body.location;
      const { weather_descriptions, temperature, feelslike } = body.current;

      callback(
        null,
        `${name}, ${country}. ${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike}.`
      );
    }
  });
}

module.exports = forecast;
