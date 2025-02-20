// Notes:

/**
 * Closures let the inner function 'remember' variables from outer. Powerful for 'state management'.
 * Closures retain access to their outer scope because of JavaScript’s Lexical Scoping (functions remember their creation context).
 * JavaScript does not destroy variables when the function that created them exits if there's a reference to them in an inner function.
 */

/** Data Privacy (Encapsulation)
 * Closures allow us to create 'private variables' inside functions.
 */

function counter() {
  let count = 0;
  return {
    increment: function () {
      count++;
      console.log(`count: ${count}`);
    },
    decrement: function () {
      count--;
      console.log(`count: ${count}`);
    },
  };
}

const myCounter = counter();
myCounter.increment(); // count: 1
myCounter.increment(); // count: 2
myCounter.decrement(); // count: 1
// count is not directly accessing from outside, ensuring data privacy.

/** Function Factories (Generating Customized Functions) */
function createMultiplier(multiplier) {
  return function (num) {
    return num * multiplier;
  };
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15
// `double` and `triple` retain access to their respective multiplier values.

/** Event Listeners (Retaining State)
 * Closures help retain state in event handlers.
 */
function attachEventHandler(buttonId) {
  let count = 0;
  document.getElementById(buttonId).addEventListener("click", function () {
    count++;
    console.log(`Button clicked ${count} times`);
  });
}
attachEventHandler("myButton");
// The event listener 'remembers' the count variable, even after `attachEventHandler` has executed.

/** Currying (Chaining Functions)
 * Closures enable currying, breaking functions into smaller functions.
 */

function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
add(1)(2)(3); // 6
// Each function 'remembers' its parameter values via 'closures'.

/** Closures and Memory Management
 * Since closures retain variables in memory, excessive use can lead to memory leaks.
 */

// How to Avoid Memory Leaks? - Remove event listeners when not needed
function attachHandler() {
  let count = 0;
  function listener() {
    count++;
    console.log(count);
  }
  document.getElementById("btn").addEventListener("click", listener);

  // Remove listener when no longer needed
  return function () {
    document.getElementById("btn").removeEventListener("click", listener);
  };
}

const removeClickListener = attachHandler();
// Later, call removeClickListener() to free memory
/**
 * Avoid unnecessary closures inside loops
 * Use WeakMaps for caching (allows garbage collection)
 */

/**
 * Conclusion *
 * Closures are a powerful concept in JavaScript, enabling data encapsulation, maintaining state,
 * and optimizing performance. However, they should be used carefully to avoid memory issues.
 */
