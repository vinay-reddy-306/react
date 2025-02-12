/**
 * JavaScript provides two main ways to declare functions:
 * Traditional (Regular) Functions – Using function keyword.
 * Arrow Functions – Introduced in ES6 (=> syntax).
 * Arrow functions provide a more concise syntax and behave differently in `this` binding, arguments object, and return statements.
 */
 
/** SYNTAX DIFFERENCES */
function greet(name) {
    return "Hello, " + name;
  }
  
console.log(greet("Alice")); // Hello, Alice

// Arrow functions
const greet = (name) => "Hello, " + name;

console.log(greet("Alice")); // Hello, Alice

// 🔹 Arrow functions remove the need for the function keyword and use =>.
// 🔹 If there’s only one parameter, parentheses () are optional.
// 🔹 If the function contains a single expression, {} and return are optional.

/**  this KEYWORD BEHAVIOUR 
 * ✅ Traditional Functions Have Their Own `this`
 * In traditional functions, `this` depends on how the function is called.
 */
const user = {
    name: "Alice",
    greet: function() {
      console.log("Hello, " + this.name);
    }
};
  
user.greet(); // ✅ "Hello, Alice"
// `this` inside greet refers to the user object.

// ❌ Problem with `this` in Traditional Functions
// If you use a traditional function inside a method, `this` may not behave as expected.
const test = {
    name: "Alice",
    greet: function() {
      setTimeout(function() {
        console.log("Hello, " + this.name); // ❌ Undefined
      }, 1000);
    }
};
test.greet();
// this.name is `undefined` because setTimeout runs in the global scope (window in browsers, global in Node.js).

// ✅ Arrow Functions Inherit `this` from Their Lexical Scope
// Arrow functions do not have their own `this`; they inherit it from the surrounding function.
const sample = {
    name: "Alice",
    greet: function() {
      setTimeout(() => {
        console.log("Hello, " + this.name); // ✅ Works! "Hello, Alice"
      }, 1000);
    }
};
sample.greet();

// 🔹 Since arrow functions do not create their own `this`, they inherit `this` from greet.
// 🔹 This makes arrow functions ideal for callbacks and event listeners.

/** 3. arguments Object Behavior
 * ✅ Traditional Functions Have an arguments Object
 */
function showArguments() {
  console.log(arguments);
}

showArguments(1, 2, 3); // ✅ [1, 2, 3]
//🔹 In traditional functions, arguments contains all passed parameters.

// ❌ Arrow Functions Do NOT Have an arguments Object
const showArguments = () => {
  console.log(arguments);
};

showArguments(1, 2, 3); // ❌ ReferenceError: arguments is not defined

// 🔹 Arrow functions do not have arguments, but you can use rest parameters (...args) instead:
const showArguments = (...args) => {
  console.log(args);
};

showArguments(1, 2, 3); // ✅ [1, 2, 3]

/**  4. new Keyword Behavior
 * ✅ Traditional Functions Can Be Used as Constructors
 */ 
function Person(name) {
  this.name = name;
}

const alice = new Person("Alice");
console.log(alice.name); // ✅ "Alice"
// 🔹 Regular functions can be used with new to create instances.

// ❌ Arrow Functions CANNOT Be Used as Constructors
const Person = (name) => {
  this.name = name;
};

const tom = new Person("Tom"); // ❌ TypeError: Person is not a constructor
// 🔹 Arrow functions do not have their own this, so they cannot be used with new.

/** 5. Implicit Return Behavior
 * ✅ Traditional Functions Require return
 */ 
function add(a, b) {
  return a + b;
}

console.log(add(3, 4)); // ✅ 7

// ✅ Arrow Functions Support Implicit Return
const add = (a, b) => a + b;

console.log(add(3, 4)); // ✅ 7
// 🔹 If the function body contains only one expression, {} and return can be omitted.

// 🔹 For multiple statements, {} is required:
const add = (a, b) => {
  const sum = a + b;
  return sum;
};

/** 6. Handling Object Return
 * ✅ Returning Objects in Traditional Functions
 */ 
function getUser() {
  return { name: "Alice", age: 25 };
}
console.log(getUser());

// ❌ Arrow Function Needs Parentheses for Object Return
const getUser = () => { name: "Alice", age: 25 }; // ❌ Undefined

// ✅ Correct way:
const getUser = () => ({ name: "Alice", age: 25 });
console.log(getUser()); // ✅ { name: 'Alice', age: 25 }
// 🔹 Objects must be wrapped in parentheses () to be returned implicitly.

/** 7. Practical Use Cases
 * ✅ Use Arrow Functions for Callbacks
 */ 
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6]

// ✅ Use Regular Functions for Object Methods
const person = {
  name: "Alice",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};
person.greet(); // ✅ "Hello, Alice"

// ✅ Use Arrow Functions for Short Functions
const square = x => x * x;
console.log(square(4)); // ✅ 16

// ✅ Use Regular Functions for Constructors
function Car(brand) {
  this.brand = brand;
}
const myCar = new Car("Toyota");
console.log(myCar.brand); // ✅ "Toyota"

/** Conclusion
 * ✅ Use arrow functions for short, simple functions and when you need lexical this.
 * ✅ Use traditional functions when you need this, arguments, or constructors.
 * ✅ For methods inside objects, use regular functions to correctly handle this.
 */ 
