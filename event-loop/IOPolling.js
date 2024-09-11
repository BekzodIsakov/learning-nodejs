const fs = require("fs");

// According to event loop queue diagram, "readFile 1" should've come before "setImmediate 1" but the reason is I/O events are polled and callback function are added to the I/O queue only after the I/O is complete
// EXAMPLE-1
fs.readFile(__filename, () => {
  console.log("readFile 1");
});

process.nextTick(() => console.log("nextTick 1"));
Promise.resolve().then(() => console.log("promise 1"));
setTimeout(() => console.log("setTimeout 1"), 0);
setImmediate(() => console.log("setImmediate 1"));

for (let i = 0; i < 2_000_000_000; i++) {}
// Outcome:
// nextTick 1
// promise 1
// setTimeout 1
// setImmediate 1
// readFile 1