# **Generics in TypeScript**

Generics in TypeScript provide a way to create reusable, flexible, and type-safe components. They allow you to write code that works with **multiple types** without sacrificing type safety. By using **type placeholders** (like `<T>`), you can constrain and reuse types across functions, classes, and interfaces.

---

## **Key Concepts Covered**

1. What are Generics?
2. Writing Generic Functions
3. Utility Functions with Generics
4. Generics with Interfaces
5. Constraining Generic Types (`extends` keyword)
6. Generics in Classes

---

## **1. What are Generics?**

Generics allow us to **parameterize types**. This means we can work with variables (functions, classes, or types) without hardcoding specific types, making the code more reusable and type-safe.

---

### **Example: Simple Generic Function**

```typescript
const echo = <T>(arg: T): T => arg; 
```

Here:
1. **`<T>`**: `T` is a type placeholder (type variable).
   - This tells the function that the type will be provided when the function is used.
   - It could be anything: `T`, `U`, `Type`, etc.
2. The function accepts an argument `arg` of type `T` and returns a value of the same type `T`.

**Usage:**
```typescript
echo<string>("Hello"); // ✅ Works with strings
echo<number>(123); // ✅ Works with numbers
echo<boolean>(true); // ✅ Works with booleans
```

**Why Generics?**
- Without generics, you would need separate functions for each type (`string`, `number`, etc.).
- With generics, the function adapts to whatever type you pass in — maintaining **type safety**.

---

## **2. Writing Generic Utility Functions**

### **a. Checking for Objects**

Generics can be used to create reusable utility functions. Let's define a function that checks if a value is an object:

```typescript
const isObj = <T>(arg: T): boolean => {
    return typeof arg === 'object' && arg !== null && !Array.isArray(arg);
};
```

**How it Works:**
1. `<T>`: Allows the function to work with any type.
2. `typeof arg === 'object'`: Ensures `arg` is an object.
3. `arg !== null`: Excludes `null` (because `typeof null` is `"object"` in JavaScript).
4. `!Array.isArray(arg)`: Excludes arrays, as they are technically objects in JavaScript.

**Usage:**
```typescript
console.log(isObj("Hello")); // false
console.log(isObj(123)); // false
console.log(isObj([1, 2, 3])); // false
console.log(isObj({})); // true
console.log(isObj(null)); // false
```

---

### **b. Checking Truthy or Falsy Values**

Using generics, we can create a generalized function to check if a value is "truthy":

```typescript
const isTrue = <T>(arg: T): { arg: T; is: boolean } => {
    if (Array.isArray(arg) && !arg.length) {
        return { arg, is: false }; // Empty array is falsy
    }
    if (isObj(arg) && !Object.keys(arg as keyof T).length) {
        return { arg, is: false }; // Empty object is falsy
    }
    return { arg, is: !!arg }; // Coerce value to a boolean
};
```

**Usage:**
```typescript
console.log(isTrue([])); // { arg: [], is: false }
console.log(isTrue({})); // { arg: {}, is: false }
console.log(isTrue("Hello")); // { arg: 'Hello', is: true }
```

---

## **3. Generics with Interfaces**

Interfaces can also be made generic, allowing type placeholders to be used in complex structures.

### Example:
```typescript
interface BoolCheck<T> {
    arg: T;
    is: boolean;
}

const checkBooleanValue = <T>(arg: T): BoolCheck<T> => {
    if (Array.isArray(arg) && !arg.length) {
        return { arg, is: false };
    }
    if (isObj(arg) && !Object.keys(arg as keyof T).length) {
        return { arg, is: false };
    }
    return { arg, is: !!arg };
};

// Usage
console.log(checkBooleanValue([1, 2, 3])); // { arg: [1, 2, 3], is: true }
console.log(checkBooleanValue("")); // { arg: '', is: false }
```

---

## **4. Constraining Generic Types with `extends`**

Constraining a generic type ensures the type must meet certain criteria. This is done using `extends`.

### Example: Ensuring a Generic Type has an `id`

```typescript
interface HasID {
    id: number;
}

const processUser = <T extends HasID>(user: T): T => {
    return user;
};

console.log(processUser({ id: 1, name: "Test" })); // ✅ Works
// console.log(processUser({ name: "Test" })); // ❌ Error: Property 'id' is missing
```

#### Explanation:
- `<T extends HasID>`: The generic type `T` must satisfy the `HasID` interface (i.e., `T` must have an `id` property of type `number`).
- If the constraint isn’t met, TypeScript throws an error.

---

## **5. Generic Function to Access Properties**

Using generics, we can write a generic function to retrieve properties dynamically:

```typescript
const getUserProperty = <T extends HasID, K extends keyof T>(users: T[], key: K): T[K][] => {
    return users.map(user => user[key]);
};

// Usage
const users = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 }
];
console.log(getUserProperty(users, "name")); // ✅ ['John', 'Jane']
// console.log(getUserProperty(users, "salary")); // ❌ Error: 'salary' does not exist on type 'T'
```

#### Explanation:
1. `<T extends HasID>`: Ensures `T` must have an `id`.
2. `<K extends keyof T>`: The `key` parameter must be a valid key of the type `T`.
3. `T[K]`: Represents the type of the value at key `K` in `T`.

---

## **6. Generics in Classes**

Generics can also be used in classes to define reusable, type-safe structures.

### Example: Generic Class

```typescript
class User<T> {
    data: T;

    constructor(data: T) {
        this.data = data;
    }

    // Getter
    get state(): T {
        return this.data;
    }

    // Setter
    set state(value: T) {
        this.data = value;
    }

    getValue(): T {
        return this.data;
    }
}

// Creating an instance
const store = new User("Avinash"); // TypeScript infers type as `string`
console.log(store.state); // "Avinash"
// store.state = 123; // ❌ Error: 'number' is not assignable to 'string'
```

### Defining Types Explicitly
You can explicitly define the type when creating an instance of the class, ensuring stronger type enforcement:

```typescript
const store1 = new User<string>("Avinas"); // Only string
const store2 = new User<string | number>("Avinas"); // Allows string or number

store2.state = 1; // ✅ Type-safe
```

---

## **Key Takeaways**

1. **Generics Enhance Reusability**:
   - Instead of writing different versions of functions or classes for each type, generics allow you to write **type-safe reusable code**.

2. **Generic Constraining**:
   - Use `extends` to add restrictions to your generic types and ensure they meet specific interfaces or conditions.

3. **Generic Utility Functions**:
   - Generics work well for utility functions (e.g., `isObj`, `checkBooleanValue`, `processUser`), where the input or output type varies.

4. **Generics in Classes**:
   - Use generic types in classes for flexible and reusable components that still maintain type safety.

5. **Utility with `keyof`**:
   - Combine generics and the `keyof` operator to safely access dynamic properties.

---

By incorporating **generics** in TypeScript, you can write **dynamic yet strongly-typed code**, making your applications more robust, reusable, and maintainable.