// Callbacks in the microtask queues are executed before callbacks in the I/O queue
// EXAMPLE-1
const fs = require("fs");

fs.readFile(__filename, () => {
  console.log("readFile 1");
});

process.nextTick(() => console.log("nextTick 1"));
Promise.resolve().then(() => console.log("promise 1"));

// Outcome:
// nextTick 1
// promise 1
// readFile 1

// When running setTimeout with delay of 0ms and an I/O async method, the order of execution can never be guaranteed.
// EXAMPLE-2
setTimeout(() => console.log("setTimeout 1"), 0);

fs.readFile(__filename, () => {
  console.log("readFile 1");
});

// Outcome 1:
// setTimeout 1
// readFile 1

// Outcome 2:
// readFile 1
// setTimeout 1

// I/O queue callbacks are executed after Microtask queue callbacks and Timer queue callbacks. 
// EXAMPLE-3
fs.readFile(__filename, () => {
  console.log("readFile 1");
});

process.nextTick(() => console.log("nextTick 1"));
Promise.resolve().then(() => console.log("promise 1"));
setTimeout(() => console.log("setTimeout 1"), 0);

for (let i = 0; i < 2_000_000_000; i++) {}
// Outcome:
// nextTick 1
// promise 1
// setTimeout 1
// readFile 1

