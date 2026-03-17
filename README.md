# Assingment-5-Github-Issuse-Tracker

1️⃣ What is the difference between var, let, and const?
Answer: 1.var

(a). Scope: Function-scoped (or global if outside a function)

(a.i).Meaning: If you declare var inside a function, it’s only visible inside that function. Outside a function, it becomes global.

(b).Hoisting: Variables declared with var are hoisted and initialized with undefined.

(c).Reassignable: Yes, you can reassign values.

(d).Redeclarable: Yes, you can redeclare the same variable in the same scope.

2.let

(a).Scope: Block-scoped (inside { ... })

(b).Hoisting: Hoisted, but not initialized. Accessing it before declaration causes a ReferenceError.

(c).Reassignable: Yes, you can change the value.

(d).Redeclarable: No, cannot redeclare in the same scope.

3.const

(a).Scope: Block-scoped (same as let)

(b).Hoisting: Hoisted but not initialized (same as let)

(c).Reassignable:  No, cannot reassign the variable.

(d).Redeclarable:  No, cannot redeclare in the same scope.

(e).Important: For objects/arrays, the reference cannot change, but the contents can be modified.


2️⃣ What is the spread operator (...)?

Answer:

(a).The spread operator (...) is used to expand elements of an array or properties of an object.

(b).It is commonly used for copying, merging, or passing elements as function arguments.

3️⃣ What is the difference between map(), filter(), and forEach()?
Answer: 1.map()

(a).Purpose: Transforms each element of an array and returns a new array with the transformed values.

(b).Return value: New array of same length

(c).Original array: Not modified

2.filter()

(a).Purpose: Selects elements that pass a test and returns a new array of the filtered elements.

(b).Return value: New array with only elements that meet the condition

(c).Original array: Not modified

3.forEach()

(a).Purpose: Executes a function on each element of an array.

(b).Return value: undefined (does not return a new array)

(c).Original array: Can be modified inside the callback


4️⃣ What is an arrow function?

Answer:

(a).An arrow function is a shorter syntax for writing functions using => instead of the function keyword.

(b).It is always anonymous (has no name unless assigned to a variable).

(c).Arrow functions do not have their own this, arguments, or super; they inherit this from the surrounding scope


5️⃣ What are template literals?

Answer:

(a).Template literals are a way to create strings using backticks (`) instead of single (') or double (") quotes.

(b).They allow string interpolation (embed variables) and multiline strings easily.

(c).Syntax for interpolation: ${expression}