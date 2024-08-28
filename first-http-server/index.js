const http = require("node:http");

const port = 8080;
const server = http.createServer();

server.on("request", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<h1>This is an HTTP server response from index.js file in Node.js</h1>");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
