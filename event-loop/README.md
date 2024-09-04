# Event loop

The event loop is what allows Node.js to perform non-blocking I/O operations —
despite the fact that a single JavaScript thread is used by default — by
offloading operations to the system kernel whenever possible.

## Asynchronous Javascript

Javascript is synchronous, blocking, single-threaded language

#### Blocking

No matter how long a previous process takes, the subsequent processes won't kick
off until the former is completed

#### Single threaded

A thread is simply a process that your JavaScript program can use to run a task.
Each thread can do only one task at a time. Javascript has just one thread
called the main thread for executing any code

![Event loop](./assets/Screenshot%202024-09-04%20at%2007.16.48.png "Event loop")

## Memory heap

The V8 memory heap refers to the memory management system used by the V8
JavaScript engine, which powers Node.js and Google Chrome's JavaScript
execution. It's where V8 allocates and stores JavaScript objects and dynamic
data. In V8 JavaScript, the data types stored in the memory heap are primarily the reference types. Here's a simple breakdown:
1. Objects
2. Arrays
3. Functions
4. Strings (except for some short strings that may be optimized differently)
5. Dates
6. RegExp objects
7. Map and Set objects
8. Custom types you define 

#### The heap is divided into 3 different spaces:
- There's a section for new items (young generation)
- A section for items that have been around longer (old generation)
- A special area for really big items (large object space)

<details>
  <summary>Memory heap spaces</summary>

  <h3>New Space (Young Generation):</h3>
  <ol>
    <li>
      <strong>Purpose:</strong> The new space is where most objects are initially allocated. It is relatively small and optimized for short-lived objects.
    </li>
    <li>
      <strong>Subdivisions:</strong>
      <ol>
        <li>
          <strong>Eden Space:</strong> Newly created objects are first allocated here.
        </li>
        <li>
          <strong>Survivor Spaces:</strong> Objects that survive a garbage collection cycle in the Eden
          space are moved to one of the two survivor spaces (from-space and to-space).
        </li>
      </ol>
    </li>
    <li>
      <strong>Garbage Collection:</strong> Minor garbage collections happen frequently in the new space
      to free up memory. If an object survives several minor collections, it is promoted to the old space.
    </li>
  </ol>

  <h3>Old Space (Old Generation):</h3>
  <ol>
    <li>
      <strong>Purpose:</strong> The old space holds objects that have lived long enough in the new space to be considered long-lived.
    </li>
    <li>
      <strong>Subdivisions:</strong>
      <ol>
        <li>
          <strong>Old Pointer Space:</strong> Stores objects with references to other objects.
        </li>
        <li>
          <strong>Old Data Space:</strong> Stores objects with references to other objects.
        </li>
      </ol>
    </li>
    <li>
      <strong>Garbage collection:</strong> Major garbage collections are less frequent and more costly. The objects here are often deeply rooted in the application and are not collected often
    </li>
  </ol>

  <h3>Large Object Space:</h3>
  <ol>
    <li>
      <strong>Purpose:</strong> Objects that are too large to fit into the new space are allocated here
    </li>
    <li>
      <strong>Garbage collection:</strong> Objects in this space are individually managed and garbage collected.
    </li>
  </ol>
</details>
  
## libuv
libuv is a cross platform open source library written in C language. It handles
asynchronous non-blocking operations on Node.js.

## Synchronous
![Execution stack](./assets/stack.gif "Execution stack")

## Asynchronous

