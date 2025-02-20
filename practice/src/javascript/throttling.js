/**
 * Throttling ensures that a function executes at most once per specified time interval, even if the event occurs continuously.
 * 🛠 How It Works:
 * The function executes immediately on the first event.
 * For subsequent events, the function is blocked until the cooldown period ends.
 * Useful for continuous events like scrolling, mouse movement, or resizing.
 */
//Without Throttling (Inefficient)
Example: window.addEventListener("scroll", function () {
  console.log("Scroll Event Fired!");
});
// Every small scroll event triggers a log = ❌ Too many function calls!

// With Throttling (Efficient)
function throttle(func, interval) {
  let lastExecuted = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastExecuted >= interval) {
      func.apply(this, args);
      lastExecuted = now;
    }
  };
}

const handleScroll = throttle(() => {
  console.log("Scroll Event Fired!");
}, 1000); // Execute at most once per second

window.addEventListener("scroll", handleScroll);
// ✅ Now, the function runs at most once every second while scrolling.
// ✅ Prevents excessive function execution.

// 🚀 When to Use Throttling?
// Scroll Event	-> Optimize infinite scrolling or animations
// Mouse Move -> Update UI based on cursor position
// Button Click ->	Prevent multiple submissions in a short period

/**
 * When to Use Which?
 * ✔ Use Debouncing when you want the action to execute only after the event stops.
 * ✔ Use Throttling when you want the action to execute at a fixed rate, even during continuous events.
 */
