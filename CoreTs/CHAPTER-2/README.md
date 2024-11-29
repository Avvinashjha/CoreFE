## Let's Learn Some Terminology 

- Strongly Typed Language : Typscript
- Loosely Typed Language : JavaScript

- Static Typing Language : 
- Dynamic Typing Language :

- A Language that is Strongly Typed Language can be either statically or dynamically typed.

- Typescript is a statically-typed language. This Means types are checked at compile time.

- JavaScript is a dynamically typed language. This means types are checked at run time.

- Benifits of Typescript
    - Self Documenting Code
    - Catch Errors in Development
    - Great for Large Teams


## Types in Typescript

In TypeScript, types are used to enforce static type-checking, ensuring that variables, parameters, and function return values conform to specific data types. These types are the building blocks that help you write safer, more predictable, and maintainable code.

Here's a comprehensive explanation of the various **types in TypeScript**, along with examples and **use cases**:

---

## **1. Primitive Types**

### a. `number`

Represents numeric values, including integers and floating-point numbers.

**Example:**
```typescript
let age: number = 25;
let pi: number = 3.14159;
```

**Use Case:** Use for quantities, measurement values, and numerical calculations.

---

### b. `string`

Represents textual data.

**Example:**
```typescript
let name: string = "John";
let message: string = `Hello, ${name}`;
```

**Use Case:** Use for handling textual information like names, emails, and messages.

---

### c. `boolean`

Represents a true/false value.

**Example:**
```typescript
let isVerified: boolean = true;
```

**Use Case:** Use for flags, conditions, and states (e.g., `isLoggedIn`, `hasAccess`).

---

### d. `null` and `undefined`

- `null`: Represents the absence of value.
- `undefined`: Represents an uninitialized variable.

**Example:**
```typescript
let empty: null = null;
let notAssigned: undefined = undefined;
```

**Use Case:** Use when explicitly setting a value to `null` to indicate "no value." Avoid using `undefined` explicitly—TypeScript assigns it by default to uninitialized variables.

---

### e. `bigint`

Introduced in ES2020, represents arbitrarily large integers.

**Example:**
```typescript
let bigValue: bigint = 9007199254740991n; // Use `n` suffix for bigints.
```

**Use Case:** Use when dealing with very large numbers that exceed the JavaScript `number` precision limit.

---

### f. `symbol`

A unique and immutable data type often used as object property keys.

**Example:**
```typescript
const uniqueKey: symbol = Symbol("key");
```

**Use Case:** Use to create unique identifiers or for advanced use cases like metadata.

---

## **2. Any Type (`any`)**

The `any` type allows variables to bypass type-checking, accepting any value.

**Example:**
```typescript
let random: any = 42;
random = "A new value"; // No error
random = { key: "value" }; // No error
```

**Use Case:** Avoid using `any` unless absolutely necessary (e.g., migrating JavaScript code to TypeScript).

---

## **3. Unknown Type (`unknown`)**

`unknown` is similar to `any` but requires a type check or type assertion before use.

**Example:**
```typescript
let input: unknown = "Hello";

if (typeof input === "string") {
    console.log(input.toUpperCase()); // Works fine
}
```

**Use Case:** Use when receiving inputs with an unknown type (e.g., user input or data from an API).

---

## **4. Custom Types**

### a. `object`

Represents a non-primitive type (i.e., anything that is not `number`, `string`, `boolean`, `null`, or `undefined`).

**Example:**
```typescript
let person: object = { name: "John", age: 30 };
```

**Use Case:** Use for objects but prefer more specific types (e.g., `interfaces` or `type aliases`).

---

### b. `array`

Represents an ordered collection of values sharing the same type.

**Example:**
```typescript
let numbers: number[] = [1, 2, 3, 4];
let fruits: Array<string> = ["apple", "banana", "cherry"];
```

**Use Case:** Use to handle lists, collections, or group related data (e.g., shopping cart items).

---

### c. `tuple`

Represents a fixed-length array where each element has a specific type.

**Example:**
```typescript
let user: [string, number, boolean] = ["Alice", 30, true];
```

**Use Case:** Use for fixed structures like database rows, configurations, or coordinates.

---

## **5. Specialized Types**

### a. Literal Types

Restrict variables to specific, literal values.

**Example:**
```typescript
let color: "red" | "green" | "blue";
color = "red"; // ✅
// color = "yellow"; // ❌ Error
```

**Use Case:** Use for enums, commands, or state variations (e.g., `"play"` | `"pause"` | `"stop"`).

---

### b. Union Types (`|`)

Allows multiple types in a variable.

**Example:**
```typescript
let id: string | number; 
id = 42; // ✅
id = "abc123"; // ✅
```

**Use Case:** Use when data can reasonably be one of several types (e.g., `id` as `string` or `number`).

---

### c. Intersection Types (`&`)

Combines multiple types into one.

**Example:**
```typescript
type Admin = { name: string; privileges: string[] };
type User = { name: string; email: string };
type SuperUser = Admin & User;

let superUser: SuperUser = {
    name: "AdminUser",
    privileges: ["manage-users"],
    email: "admin@example.com"
};
```

**Use Case:** Use when combining interfaces (e.g., combining attributes for a hybrid object).

---

## **6. Enums**

Enums allow you to define a set of named constants.

**Example:**
```typescript
enum Role {
    Admin,
    User,
    Guest
}

let userRole: Role = Role.Admin;
console.log(userRole); // 0 (Enum values are auto-assigned starting from 0)
```

**Use Case:** Use for predefined, finite sets like roles, directions, or statuses (e.g., `Pending`, `Completed`).

---

## **7. Type Aliases and Interfaces**

### a. Type Alias

Allows you to create reusable, custom types.

**Example:**
```typescript
type Product = {
    name: string;
    price: number;
    inStock: boolean;
};
let item: Product = { name: "Shoes", price: 50, inStock: true };
```

---

### b. Interface

Defines the shape of an object and can be extended.

**Example:**
```typescript
interface Product {
    name: string;
    price: number;
    inStock: boolean;
}

let product: Product = { name: "Phone", price: 999, inStock: true };
```

**Use Case:** Use for reusable and extendable object types, such as models in a TypeScript project.

---

## **8. Function Types**

### a. Parameter and Return Types

Specify the types for function parameters and return values.

**Example:**
```typescript
const add = (a: number, b: number): number => {
    return a + b;
};
```

**Use Case:** Use to avoid incorrect parameter usage or unexpected return values.

---

### b. Void

Represents functions that return nothing.

**Example:**
```typescript
const logMessage = (message: string): void => {
    console.log(message);
};
```

**Use Case:** Use for logging, event handlers, or side-effect-only functions.

---

### c. Never

Represents functions that never return (e.g., they throw errors or have infinite loops).

**Example:**
```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

**Use Case:** Use for error-handling or functions designed to stop execution.

---

## **9. `unknown` vs. `any`**

### **`unknown`:**
Requires type checking before usage.
```typescript
let input: unknown = "hello";
// console.log(input.toUpperCase()); // ❌ Error
if (typeof input === "string") {
    console.log(input.toUpperCase()); // ✅
}
```
**Use Case:** Use for safer handling of unknown inputs (e.g., user input or API response).

### **`any`:**
Bypasses type-checking entirely.
```typescript
let input: any = "hello";
console.log(input.toUpperCase()); // ✅ No error, but unsafe.
```
**Use Case:** Use sparingly, only when porting older JavaScript code to TypeScript.

---

## **10. Utility Types**

TypeScript provides **utility types** to manipulate types.

### Example: `Partial`
Converts all properties in a type into optional ones.
```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

let partialUser: Partial<User> = { name: "John" }; // ✅ `age` and `email` are optional now.
```

**Use Case:** Use when updating or modifying only part of an object.

---

## Conclusion

### **Why Types in TypeScript Are Useful:**
- Prevent runtime errors by catching problems at compile time.
- Improve developer productivity with better code hints and auto-completion.
- Make your code more descriptive, predictable, and self-explanatory.

By leveraging TypeScript types effectively (whether primitive, custom, or advanced types like unions and intersections), you can create robust, maintainable, and scalable applications.
