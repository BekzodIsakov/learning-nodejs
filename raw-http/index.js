const { error } = require("console");
const http = require("http");
const URL = "";

const request = http.request(URL, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data += chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", () => {
  console.log("Something went wrong:", error);
});

request.end();
