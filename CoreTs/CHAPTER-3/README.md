# Understanding TypeScript Features with Examples

TypeScript is a superset of JavaScript that provides static type checking at compile time. This document explores various TypeScript features, including arrays, tuples, objects, enums, type aliases, union types, functions, and more, through examples and explanations.

---

## Arrays

TypeScript allows you to create strictly-typed arrays.

### String Array

```typescript
let stringArray = ['one', 'two', 'three']; // Inferred as `string[]`

// Trying to add a number results in a compilation error
// stringArray.push(4); // ❌ Argument of type 'number' is not assignable to parameter of type 'string'.
```

---

### Mixed-Type Array

```typescript
let player = ['virat', 2007, true]; // Inferred as (string | number | boolean)[]
player[0] = 20; // ✅ Allowed: Assigning a number to an index with `string | number`.

player.push(true); // ✅ Allowed as 'boolean' exists in the array type.

// player.push({}); // ❌ Argument of type '{}' is not assignable to parameter of type 'string | number | boolean'.
```

---

### Empty Array

```typescript
let test = []; // Inferred as `any[]` because no type restriction is provided.

test.push("hello");
test.push(10);

let brands: string[] = []; // Declared as a string array
brands.push("Nike");
// brands.push(1); // ❌ Error: Argument of type 'number' is not assignable to parameter of type 'string'.
```

---

## Tuples

A tuple is a typed array where the types of individual elements are specified.

```typescript
let myTuple: [string, number, boolean] = ["Sachin", 1995, true];

// myTuple[0] = 1; // ❌ Error: Type 'number' is not assignable to type 'string'.

// You cannot assign a generic array to a tuple.
// myTuple = player; // ❌ Incompatible types
```

---

## Objects

In TypeScript, objects can be defined with strict types.

```typescript
const obj1 = {
    prop1: "Sachin",
    prop2: 1995,
    prop3: true
};

// obj1.prop3 = 1; // ❌ Error: Type 'number' is not assignable to type 'boolean'.
```

---

## Defining Object Types Using Type Alias

A `type` alias allows reusable and stricter definitions for an object.

```typescript
type Player = {
    name: string;
    age: number;
    isRetired: boolean;
    scores: (string | number)[];
};

let player1: Player = {
    name: "Sachin",
    age: 1995,
    isRetired: true,
    scores: ["100", "200", 300]
};

// Missing required `age` property
// let player2: Player = { name: "Virat", isRetired: false, scores: ["100", 200] }; // ❌ Error
```

---

## Optional Properties

You can make properties optional by adding `?`.

```typescript
type PlayerOptional = {
    name?: string;
    age?: number;
    isRetired: boolean;
    scores: (string | number)[];
};

let playerOptional1: PlayerOptional = {
    name: "Sachin",
    age: 22,
    isRetired: true,
    scores: ["100", "200", 300]
};

let playerOptional2: PlayerOptional = {
    isRetired: false,
    scores: ["50", "100", 150]
};
```

### Function Example with Optional Properties

```typescript
const greetPlayer = (player: PlayerOptional) => {
    if (player.name) {
        console.log(player.name.toLowerCase());
    } else {
        console.log("Anonymous");
    }
};

greetPlayer(playerOptional2); // Outputs: Anonymous
```

---

## Enums

Enums allow you to define a set of named constants.

```typescript
enum Grade {
    F = 1,
    E,
    D,
    C,
    B,
    A
}

let myGrade: Grade = Grade.A;
console.log(myGrade); // 6
```

---

## Type Aliases

```typescript
type stringOrNumber = string | number;
type stringOrNumberArray = (string | number)[];
type Student = {
    name: string;
    age: stringOrNumber;
    grade: Grade;
    scores: stringOrNumberArray;
};
```

---

### Literal Types

Literal types restrict variables to specific values.

```typescript
let myName: "Avinash" | "Sam" | "Sharma";
myName = "Avinash"; // ✅
// myName = "John"; // ❌ Error: Type '"John"' is not assignable.
```

---

## Functions

TypeScript can enforce types for function parameters and return types. 

### Default Parameters

```typescript
const add = (a: number, b: number, c: number = 2): number => {
    return a + b + c;
};

console.log(add(5, 10)); // 17
```

### Optional Parameters

```typescript
const sum = (a: number, b: number, c?: number): number => {
    return c ? a + b + c : a + b;
};
console.log(sum(5, 10)); // 15
```

### Rest Parameters

```typescript
const sumAll = (...numbers: number[]): number => {
    return numbers.reduce((a, b) => a + b, 0);
};
console.log(sumAll(2, 3, 4)); // 9
```

---

### Never Type

The `never` type represents a value that will never occur. This is useful for functions that throw errors or run infinitely.

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};

const checkValueType = (value: number | string): string => {
    if (typeof value === "number") return "number";
    else if (typeof value === "string") return "string";
    return throwError("Invalid type"); // ✅ Returns `never`
};
```

---

### Function Type Aliases

```typescript
type mathFunction = (a: number, b: number) => number;

let multiply: mathFunction = (a, b) => a * b;

let divide: mathFunction = (a, b) => a / b;
console.log(multiply(10, 2));  // Outputs: 20
console.log(divide(20, 2));   // Outputs: 10
```

---

### Interfaces vs Type Aliases

- **`type`**: Can alias primitive types, unions, tuples, and objects.
- **`interface`**: Only for object types.

```typescript
type StringOrNumber = string | number; // ✅ Allowed
interface StringOrNumber {} // ❌ Error: Interface cannot use union types.
```

---

## Key Takeaways

1. **TypeScript Enforces Types**:
   - Type safety helps catch errors at compile time, reducing runtime bugs.
   
2. **Tuples and Enums**:
   - Use tuples for fixed-length, strictly-typed arrays.
   - Use enums for defining named sets of constants.

3. **Object Modeling:**
   - Use `type` or `interface` for better code readability and reusability.
   - Use optional properties (`?`) for non-required fields.

4. **Functions**:
   - Use type aliases for reusable function signatures.
   - Leverage default and rest parameters for flexibility.
   - Use `never` for functions that either never return or throw errors.

---

TypeScript is a powerful tool for creating scalable and maintainable applications. Each feature is designed to enhance productivity while providing strong typing benefits during development.

---
**20 thought-provoking and practical questions**
---

Here are the answers to the **20 questions** to help you better understand the TypeScript concepts discussed earlier. I've also provided explanations where necessary.

---

### **1. Arrays**
1. **What happens if you try to add a number to a `string[]` array?**

   ```typescript
   let stringArray: string[] = ["one", "two", "three"];
   // stringArray.push(4); // ❌ Error: Type 'number' is not assignable to type 'string'.
   ```
   - This results in a compilation error because the array was declared as `string[]`, so only `string` values can be added.

---

2. **How can you create a mixed-type array (e.g., one that can contain both `string` and `number`)?**

   ```typescript
   let mixedArray: (string | number)[] = ["hello", 42];
   mixedArray.push("world"); // ✅ Allowed
   mixedArray.push(100);     // ✅ Allowed
   // mixedArray.push(true); // ❌ Error: Type 'boolean' is not assignable to type 'string | number'.
   ```

   - Here, we use a **union type** `(string | number)` to allow multiple types in the same array.

---

3. **How can you explicitly declare an empty array that only accepts numbers?**

   ```typescript
   let numbers: number[] = [];
   numbers.push(10);  // ✅ Allowed
   numbers.push(20.5); // ✅ Allowed
   // numbers.push("100"); // ❌ Error: Type 'string' is not assignable to type 'number'.
   ```

   - Declare the array with `number[]` as its type.

---

4. **What's wrong with this code, and how do you fix it?**

   ```typescript
   let fruits = ["apple", "orange"];
   // fruits.push(42); // ❌ Error: Type 'number' is not assignable to type 'string'.
   ```
   - **Problem:** The compiler infers the array as a `string[]` since all initial elements are strings.
   - **Fix:** If you want mixed types, explicitly declare it using a union type:

   ```typescript
   let fruits: (string | number)[] = ["apple", "orange"];
   fruits.push(42); // ✅ Allowed
   ```

---

### **2. Tuples**

5. **What is a tuple in TypeScript, and how is it different from a regular array?**

   - A **tuple** is an array with a fixed number of elements with specific types at each position. 
   - A regular **array** can have a variable length and consistent or inconsistent types.

   ```typescript
   let tuple: [string, number] = ["TypeScript", 2023];
   // tuple.push(true); // ❌ Error: Type 'boolean' is not assignable.
   ```

---

6. **Tuple example question:**

   ```typescript
   let userTuple: [string, number, boolean] = ["John", 30, true];

   // Can you change `userTuple[0]` to a number?
   // userTuple[0] = 42; // ❌ Error: Type 'number' is not assignable to type 'string'.

   // Can you assign `["Alice", "Bob"]` to `userTuple`?
   // userTuple = ["Alice", "Bob"]; // ❌ Error: Length and types do not match.
   ```

---

7. **Create a tuple for `book` object:**

   ```typescript
   let book: [number, string, boolean] = [9781234567897, "Learn TypeScript", true];
   ```

   - This tuple represents: ISBN (number), Title (string), and Status (boolean).

---

### **3. Objects**

8. **Can you assign `book.title = 42`?**

   ```typescript
   let book = {
       title: "TypeScript Handbook",
       author: "Steve",
       yearPublished: 2020
   };

   // book.title = 42; // ❌ Error: Type 'number' is not assignable to type 'string'.
   ```

   - The type of `title` was inferred as `string`, so assigning it a `number` is not allowed.

---

9. **Why use `type alias` for objects?**

   - To reduce code duplication and ensure consistency:

   ```typescript
   type Book = {
       title: string;
       author: string;
       yearPublished: number;
   };

   let book1: Book = {
       title: "Book 1",
       author: "Author A",
       yearPublished: 2010
   };

   let book2: Book = {
       title: "Book 2",
       author: "Author B",
       yearPublished: 2020
   };
   ```

---

10. **What happens if a required property like `retired` is missing from a `Player` object?**

   ```typescript
   type Player = {
       name: string;
       age: number;
       retired: boolean;
       scores: number[];
   };

   // let player: Player = {
   //     name: "Sachin",
   //     age: 40,
   //     // retired: true // ❌ Error: Missing property 'retired'.
   //     scores: [100, 98]
   // };
   ```

   - Missing a required property results in a compilation error.

---

### **4. Optional Properties**

11. **Design `User` type with an optional `middleName`:**

   ```typescript
   type User = {
       firstName: string;
       middleName?: string; // Optional
       lastName: string;
   };

   let user: User = {
       firstName: "John",
       lastName: "Doe"
   };
   ```

---

12. **Fix the crash in the following function:**

   ```typescript
   const greetPlayer = (player: { name?: string }) => {
       if (player.name) {
           console.log(player.name.toLowerCase());
       } else {
           console.log("Anonymous player");
       }
   };
   ```

---

13. **Difference between optional property `?` and default values in functions:**

   - Optional (`?`) means the property **may or may not exist**.
   - Default values are **overridden** if a value is provided.

   ```typescript
   type User = { middleName?: string };

   const greet = (middleName: string = "Anonymous") => {
       console.log(`Hello, ${middleName}`);
   };
   ```

---

### **5. Enums**

14. **Create an enum for `Direction`:**

   ```typescript
   enum Direction {
       North,
       South,
       East,
       West
   }
   ```

---

15. **Value of `Grade.A` if the `Grade` enum starts from `1`:**

   ```typescript
   enum Grade {
       F = 1,
       E,
       D,
       C,
       B,
       A
   }

   console.log(Grade.A); // Outputs: 6
   ```

---

16. **When to use an enum versus a union type?**

   - Use **enums** for better readability in large sets of constants.
   - Use **union types** for small, lightweight lists.

   ```typescript
   type DirectionUnion = "North" | "South" | "East" | "West";
   ```

---

### **6. Functions**

17. **Write a function with an optional parameter:**

   ```typescript
   const sum = (a: number, b: number, c?: number): number => {
       return c ? a + b + c : a + b;
   };

   console.log(sum(5, 10)); // 15
   console.log(sum(5, 10, 5)); // 20
   ```

---

18. **Write a function with rest parameters:**

   ```typescript
   const productAll = (...numbers: number[]): number => {
       return numbers.reduce((a, b) => a * b, 1);
   };

   console.log(productAll(2, 3, 4)); // 24
   ```

---

19. **Why does the `never` function not compile?**

   - **Problem:** The function returns `void` instead of `never`.
   ```typescript
   const throwError = (message: string): never => {
       // console.log(message); // ✅ Remove this. `never` should truly never return.
       throw new Error(message);
   };
   ```

---

20. **Create reusable type alias for a function:**

   ```typescript
   type MathFunction = (a: number, b: number) => number;

   const add: MathFunction = (a, b) => a + b;
   const subtract: MathFunction = (a, b) => a - b;
   const multiply: MathFunction = (a, b) => a * b;
   ```

--- 

### **Bonus**

1. **Create a fully structured `Player` type and use it in a function:**

   ```typescript
   enum Role {
       Batsman,
       Bowler,
       Allrounder
   }

   type Player = {
       name: string;
       age?: number;
       role: Role;
       stats: [number, number]; // [matches, average]
   };

   const printPlayerStats = (player: Player) => {
       console.log(`Name: ${player.name}`);
       console.log(`Role: ${Role[player.role]}`);
       console.log(`Matches: ${player.stats[0]}, Average: ${player.stats[1]}`);
   };

   let virat: Player = { name: "Virat", role: Role.Batsman, stats: [254, 54.5] };
   printPlayerStats(virat);
   ```

Enjoy experimenting with these examples! If you'd like further clarification on any of the answers, feel free to ask.