const fs = require("fs");

// Check queue callbacks are executed after Microstask queue callbacks, Timer queue callbacks and I/O queue callbacks are executed
// EXAMPLE-1
fs.readFile(__filename, () => {
  console.log("readFile 1");
  setImmediate(() => console.log("setImmediate inside readFile 1"));
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
// setImmediate inside readFile 1


// Microtask queue callbacks are executed after I/O callbacks, and before check queue callbacks
// EXAMPLE-2
fs.readFile(__filename, () => {
  console.log("readFile 1");
  setImmediate(() => console.log("setImmediate inside readFile 1"));
  process.nextTick(() => console.log("nextTick inside readFile 1"));
  Promise.resolve().then(() => console.log("promise inside readFile 1"));
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
// nextTick inside readFile 1
// promise inside readFile 1
// setImmediate inside readFile 1


// Microtask queue callbacks are executed in between check queue callbacks
// EXAMPLE-3
setImmediate(() => console.log("setImmediate 1"));
setImmediate(() => {
  console.log("setImmediate 1")
  process.nextTick(() => console.log("nextTick 1 inside setImmediate 2"))
  Promise.resolve().then(() => console.log("promise 1 inside setImmediate 2"));

});
setImmediate(() => console.log("setImmediate 3"));

// outcome:
// setImmediate 1
// setImmediate 2
// nextTick 1 inside setImmediate 2
// promise 1 inside setImmediate 2
// setImmediate 3


// When running setTimeout with delay 0ms and setImmediate method, the order of execution can never be guaranteed
// EXAMPLE-4
setTimeout(() => console.log("setTimeout 1"), 0);
setImmediate(() => console.log("setImmediate 1"));

// The order of execution will not be the same
// Outcome 1: 
// setImmediate 1
// setTimeout 1

// Outcome 2: 
// setTimeout 1
// setImmediate 1