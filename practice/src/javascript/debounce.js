/**
 * Debouncing ensures that a function executes only after a specified delay has elapsed since the last event.
 * 🛠 How It Works:
 * The function execution is delayed until after the event stops firing for a given time.
 * If the event triggers again within the delay period, the timer resets.
 * Useful for events that happen in bursts (e.g., typing, window resize, search input).
 */

// Without Debouncing (Inefficient)
Example: document
  .getElementById("search")
  .addEventListener("input", function (event) {
    console.log("API Call: " + event.target.value);
  });
// 💡 Every keystroke triggers an API call = ❌ Too many requests!

// With Debouncing (Efficient)
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer); // Reset the timer
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const handleInput = debounce((event) => {
  console.log("API Call: " + event.target.value);
}, 500); // Wait 500ms after typing stops

document.getElementById("search").addEventListener("input", handleInput);
// ✅ Now, the function runs only after the user stops typing for 500ms.
// ✅ Prevents unnecessary API calls!

/**
 * 🚀 When to Use Debouncing?
 * Search Input	-> Avoid making API calls on every keystroke
 * Resizing Window -> Prevent running resize logic on every pixel change
 * Auto-save Feature -> Save user progress only after they stop typing
 */
