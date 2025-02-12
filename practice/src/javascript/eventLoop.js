/**
 * JavaScript is single-threaded, meaning it can only execute one piece of code at a time. 
 * However, JavaScript handles asynchronous operations (e.g., I/O, timers, API calls) efficiently using the Event Loop.
 * The Event Loop is a mechanism that allows JavaScript to handle asynchronous operations without blocking execution.
 */

/** 1. How JavaScript Executes Code
 * JavaScript has:
 * Call Stack (Executes synchronous code)
 * Web APIs (Handles async tasks like setTimeout, HTTP requests)
 * Callback Queue (Stores completed async callbacks)
 * Microtask Queue (Higher-priority queue for promises)
 * Event Loop (Manages execution between these components)
 */

console.log("Start");

setTimeout(() => {
  console.log("Timeout Callback");
}, 0);

console.log("End");

//Expected Output:
// Start
// End
// Timeout Callback

// Even though setTimeout has 0 milliseconds, it executes after synchronous code because of the Event Loop.

/** 2. Call Stack (Handles Synchronous Code)
 * JavaScript has a Call Stack, which follows LIFO (Last In, First Out). It executes synchronous code first.
 */

function foo() {
  console.log("Inside foo");
}

console.log("Start");
foo();
console.log("End");
/**
Execution:

console.log("Start") → Pushed to Call Stack → Executes → Removed
foo() → Pushed to Call Stack
console.log("Inside foo") → Executes → Removed
foo() → Removed
console.log("End") → Executes → Removed

Output:

Start
Inside foo
End
*/

/** 3. Web APIs (Handling Asynchronous Code)
 * Certain functions (e.g., setTimeout, fetch, event listeners) are asynchronous.
 * They are handled by Web APIs and do not block execution.
 */ 

Example:
console.log("Start");

setTimeout(() => {
  console.log("Timeout Callback");
}, 1000);

console.log("End");

/** Execution Flow:

console.log("Start") → Executes
setTimeout(() => { console.log("Timeout Callback") }, 1000);
Sent to Web API (Timer starts)
Does not block execution
console.log("End") → Executes
After 1 second, callback moves to Callback Queue
Event Loop moves it to Call Stack when it's empty
Output:

Start
End
Timeout Callback

*/ 

/** 4. Callback Queue (Task Queue)
Callbacks from:

setTimeout
setInterval
DOM events

move to the Callback Queue, waiting for execution.
*/ 
Example:
console.log("Start");

setTimeout(() => console.log("Timeout"), 2000);

console.log("End");
/** Order of Execution:

Start
End
Timeout  (after 2 seconds)
Even though the timeout is 2 seconds, "End" executes first because synchronous code runs first.
 */ 

/** 5. Microtask Queue (Higher Priority)
Microtasks (Promises & queueMicrotask()) execute before the Callback Queue.
 */ 
Example: 
// Promises vs setTimeout

console.log("Start");

setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");

// Order of Execution:

Start
End
Promise
setTimeout

/** Why?
console.log("Start") → Executes
setTimeout(() => console.log("setTimeout"), 0) → Goes to Callback Queue
Promise.resolve().then(() => console.log("Promise")) → Goes to Microtask Queue
console.log("End") → Executes
Event Loop: Microtasks (Promise) run before Callback Queue (setTimeout)
*/

// 6. Event Loop in Action
Example: 
// Combining Microtasks & Callbacks
console.log("Start");

setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
  return Promise.resolve();
}).then(() => console.log("Promise 2"));

console.log("End");
// Order of Execution:

Start
End
Promise - 1
Promise - 2
setTimeout

/** Execution Flow:
Synchronous Code Runs First

console.log("Start") → Executes
setTimeout moves callback to Callback Queue
Promise.resolve().then(() => console.log("Promise 1")) moves to Microtask Queue
console.log("End") → Executes
Microtasks Execute (Before Callback Queue)

"Promise 1" logs
Chained Promise 2 moves to Microtask Queue
"Promise 2" logs
Event Loop Executes Callback Queue

"setTimeout" logs
 */ 

// 7. Real-World Use Case
// Fetching Data Asynchronously

console.log("Start");

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(response => response.json())
  .then(data => console.log("Fetched Data:", data));

console.log("End");

/** Order of Execution
Start
End
Fetched Data: { id: 1, title: "..." }
Why?

fetch() is asynchronous and moves to Web API.
console.log("End") executes immediately.
When fetch completes, the .then() moves to Microtask Queue.
Event Loop executes it before Callback Queue.
 */

/** 8. Summary
 * Call Stack -> Executes synchronous code (LIFO)
 * Web APIs	-> Handles async tasks (setTimeout, fetch)
 * Callback Queue -> Stores async callbacks (executed when Call Stack is empty)
 * Microtask Queue -> Higher priority queue (Promises, MutationObservers)
 * Event Loop -> Moves tasks from queues to Call Stack
 */

/** 9. Visualizing Event Loop Execution

Call Stack    | Web APIs  | Callback Queue   | Microtask Queue
-------------------------------------------------------------
console.log() |          |                  |                
setTimeout()  | Timer 🕒 |                  |
console.log() |          |                  |
-------------------------------------------------------------
               Timer done | setTimeout()  |
-------------------------------------------------------------
               | Event Loop Moves Tasks |
-------------------------------------------------------------
               | Promise Task 🏆 |  
               | Callback Task  |
-------------------------------------------------------------

10. Final Thoughts
JavaScript executes synchronous code first.
Asynchronous code is handled via Web APIs.
Promises (Microtasks) execute before setTimeout (Callback Queue).
Event Loop ensures smooth execution of async tasks.
*/
