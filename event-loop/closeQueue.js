// Close queue callbacks are executed after all other queues callbacks in a given iteration of the event loop
// Example - 1
const fs = require("fs");

const readableStream = fs.createReadStream(__filename);
readableStream.close();

readableStream.on("close", () => {
  console.log("readableStream close 1")
})

setImmediate(() => console.log("setImmediate 1"))
setTimeout(() => console.log("setTimeout 1"))
Promise.resolve().then(() => console.log("promise 1"))
process.nextTick(() => console.log("nextTick 1"))

// Outcome:
// nextTick 1
// promise 1
// setTimeout 1
// setImmediate 1
// readableStream close 1