const request = require("postman-request");

async function geocode(place, callback) {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    place
  )}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=1`;

  request({ url: geocodeURL, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to map service!", null);
    } else if (body.features.length === 0) {
      callback("Unable to find location!", null);
    } else {
      const { center, place_name: location } = body.features[0];
      const [longitude, latitude] = center;

      callback(null, { latitude, longitude, location });
    }
  });
}

module.exports = geocode;
