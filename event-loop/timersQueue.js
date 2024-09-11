// *** EXAMPLE-1 ***
// Callbacks in the microtask queue are executed before callbacks in the timer queue
setTimeout(() => console.log("setTimeout 1"));
setTimeout(() => console.log("setTimeout 2"));
setTimeout(() => console.log("setTimeout 3"));

process.nextTick(() => console.log("process.nextTick 1"));
process.nextTick(() => {
  console.log("process.nextTick 2");
  process.nextTick(() => {
    console.log("nextTick inside nextTick");
  });
});
process.nextTick(() => console.log("process.nextTick 3"));

Promise.resolve().then(() => console.log("promise 1"));
Promise.resolve().then(() => {
  console.log("promise 2");
  process.nextTick(() => {
    console.log("nextTick inside Promise");
  });
});
Promise.resolve().then(() => console.log("promise 3"));

// Output:
// process.nextTick 1
// process.nextTick 2
// process.nextTick 3
// nextTick inside nextTick
// promise 1
// promise 2
// promise 3
// nextTick inside Promise
// setTimeout 1
// setTimeout 2
// setTimeout 3

// *** EXAMPLE-2 ***
// Callbacks in the microtask queues are executed in between the execution of callback in the timer queue
setTimeout(() => console.log("setTimeout 1"));
setTimeout(() => {
  console.log("setTimeout 2");
  process.nextTick(() => {
    console.log("nextTick inside setTimeout 2");
  });
});
setTimeout(() => console.log("setTimeout 3"));

process.nextTick(() => console.log("process.nextTick 1"));
process.nextTick(() => {
  console.log("process.nextTick 2");
  process.nextTick(() => {
    console.log("nextTick inside nextTick");
  });
});
process.nextTick(() => console.log("process.nextTick 3"));

Promise.resolve().then(() => console.log("promise 1"));
Promise.resolve().then(() => {
  console.log("promise 2");
  process.nextTick(() => {
    console.log("nextTick inside Promise");
  });
});
Promise.resolve().then(() => console.log("promise 3"));

// Output:
// process.nextTick 1
// process.nextTick 2
// process.nextTick 3
// nextTick inside nextTick
// promise 1
// promise 2
// promise 3
// nextTick inside Promise
// setTimeout 1
// setTimeout 2
// nextTick inside setTimeout 2
// setTimeout 3


// *** EXAMPLE-3 ***
// Callbacks in the microtask queues are executed in between the execution of callback in the timer queue
setTimeout(() => console.log("setTimeout 1"), 1000);
setTimeout(() => console.log("setTimeout 2"), 500);
setTimeout(() => console.log("setTimeout 3"), 0);

process.nextTick(() => console.log("process.nextTick 1"));
process.nextTick(() => {
  console.log("process.nextTick 2");
  process.nextTick(() => {
    console.log("nextTick inside nextTick");
  });
});
process.nextTick(() => console.log("process.nextTick 3"));

Promise.resolve().then(() => console.log("promise 1"));
Promise.resolve().then(() => {
  console.log("promise 2");
  process.nextTick(() => {
    console.log("nextTick inside Promise");
  });
});
Promise.resolve().then(() => console.log("promise 3"));

// Output:
// process.nextTick 1
// process.nextTick 2
// process.nextTick 3
// nextTick inside nextTick
// promise 1
// promise 2
// promise 3
// nextTick inside Promise
// setTimeout 3
// setTimeout 2
// setTimeout 1
