// NOTE:

/**     Definition  **
 * Hoisting in JavaScript is a behavior where variable and function declarations are
 * moved ("hoisted") to the top of their scope before code execution.
 * This means you can use a function or a variable before it is actually declared in the code.
 */

/**     How Hoisting Works  **
 * Hoisting moves declarations (not assignments) to the top of the scope, meaning:
 * Function declarations are fully hoisted and can be called before being defined.
 * var declarations are hoisted but initialized as undefined.
 * let and const declarations are hoisted but are in a Temporal Dead Zone (TDZ) until the code executes them.
 */

/**     Funtion Hoisting    **
 * Function declarations are fully hoisted.
 * Functions declared with the function keyword are hoisted completely, meaning they can be used before their declaration.
 */
sayHello(); // ✅ Works! "Hello, World!" is printed

function sayHello() {
  console.log("Hello, World!");
}
// JavaScript hoists the entire function, so it works even before the declaration.

// Internally, JavaScript interprets it like this:
function sayHello() {
  // Hoisted to the top
  console.log("Hello, World!");
}
sayHello(); // Works!

/**     Variable Hoisting   **
 * Using var (Hoisted but Initialized as undefined)
 */
console.log(x); // ✅ No error, but prints "undefined"
var x = 10;
console.log(x); // 10
// JavaScript hoists the declaration (var x;) to the top, but not the assignment (x = 10;).

// Internally, the interpreter reads it as:
var x; // Declaration hoisted
console.log(x); // undefined
x = 10; // Assignment remains in place
console.log(x); // 10

/**     Using let and const (Hoisted but in Temporal Dead Zone)  */
// Unlike var, let and const are also hoisted, but they remain in the "Temporal Dead Zone" (TDZ) until assigned a value.
console.log(y); // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 20;
console.log(y);
// Since let and const are hoisted but not initialized, accessing them before their declaration results in a ReferenceError.

// Internally, JavaScript treats it like this:
// let y;  // Declaration is hoisted, but it's in the Temporal Dead Zone (TDZ)
console.log(y); // ❌ Error (y is in TDZ)
y = 20;
console.log(y);

/**     Function Expressions and Arrow Functions Are NOT Hoisted    **
 * If a function is assigned to a variable (var, let, const), the variable is hoisted, but the function itself is NOT.
 */
sayHi(); // ❌ TypeError: sayHi is not a function

var sayHi = function () {
  console.log("Hi!");
};
// Why? sayHi is hoisted as undefined, so when calling it, JavaScript tries to execute undefined(), which is a TypeError.
// The same happens with arrow functions:
greet(); // ❌ ReferenceError: Cannot access 'greet' before initialization

const greet = () => console.log("Hello!");
// Since const is in the Temporal Dead Zone (TDZ), it results in a ReferenceError.

/**     Best Practices to Avoid Hoisting Issues **
 * Use let and const Instead of var
 * Declare Functions Before Using Them
 * Avoid Function Expressions Before Declaration
 */

/**     Conclusion  **
 * Hoisting moves declarations (not assignments) to the top of the scope.
 * var is hoisted but initialized as undefined, causing unexpected results.
 * let and const are hoisted but remain in the "Temporal Dead Zone" (TDZ) until declared.
 * Function declarations are fully hoisted, but function expressions and arrow functions are NOT.
 * Best practice: Always declare variables and functions before using them.
 */
