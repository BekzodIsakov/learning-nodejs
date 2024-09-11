// *** EXAMPLE-1 ***
// console.log('console.log 1');
// process.nextTick(() => {
//   console.log("process.next 1");

// })
// console.log('console.log 2');

// Output:
// console.log 1
// console.log 2
// process.next 1

// *** EXAMPLE-2 ***
Promise.resolve().then(() => console.log("promise 1"));
process.nextTick(() => console.log("process.next 1"));

// Output:
// process.next 1
// promise 1

// *** EXAMPLE-3 ***
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

// Here's the explanation for this order:
// 1. All process.nextTick callbacks are executed before any Promise callbacks. This is because the nextTick queue has higher priority than the Promise queue (microtasks queue) in Node.js.
// 2. The first three process.nextTick callbacks are queued in order.
// 3. When "process.nextTick 2" is logged, it queues another nextTick callback. This new callback is added to the end of the current nextTick queue.
// 4. After all initial nextTick callbacks are processed, the nextTick queued inside the second nextTick is executed.
// 5. Only after all nextTick callbacks are done, the Promise callbacks start executing.
// 6. The Promise callbacks execute in order.
// 7. When "promise 2" is logged, it queues a nextTick callback. However, this doesn't execute immediately, as all Promise callbacks in the current microtask queue need to finish first.
// 8. After all Promise callbacks are done, the nextTick queued inside the Promise is executed.
