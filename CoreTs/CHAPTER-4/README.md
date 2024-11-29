# **TypeScript: Type Casting (Type Assertions) and DOM Manipulation**

Type assertions (or type casting) in TypeScript allow developers to **tell the compiler explicitly** about the type of a variable when the compiler cannot infer the type or when the type inferred is too broad. This feature is especially helpful in situations where TypeScript's type inference **doesn't match the programmer's understanding of the code**.

This document explores **type casting**, **type assertions**, and **type abbreviation** with examples.

---

## **1. Type Casting or Type Assertions**

### **What is Type Casting?**
TypeScript allows you to explicitly specify that a variable is of a certain type when the compiler is unable to determine it, or when you know more about the type than TypeScript does at runtime.

For example, if a variable's type is **broad** (e.g., `string | number`), you can cast it to a **specific type** (e.g., `string`).

---

### **Casting to a More Specific or Less Specific Type**

In TypeScript:
- Casting **towards a less specific type** means asserting the variable to a *wider* type (e.g., `string` -> `string | number`).
- Casting **towards a more specific type** means asserting the variable to a *narrower* type (e.g., `string | number` -> `'hello'`).

#### **Example Code:**
```typescript
type One = string;
type Two = string | number;
type Three = 'hello';

// More specific (narrower type)
let a: One = 'hello'; // `One` is a specific string type
let c = a as Three;   // ✅ Narrowing to `'hello'` (valid because `a` is 'hello')

// Less specific (broader type)
let b = a as Two;     // ✅ Broader type is valid (`Two` includes `string`)
```

#### **Using Angle Brackets for Type Assertions**
Type assertions can also be done with **angle brackets** syntax (`<T>`). However, this syntax **cannot** be used in `.tsx` files (typically used with React).

```typescript
let d = <One>'world';         // Angle-bracket type assertion
let e = <string | number>'world'; // Angle-bracket type assertion
```

---

## **2. Example: Function Type Assertions**

Let’s walk through an example where a function returns **different types** based on conditional input, but we want to explicitly cast its result.

```typescript
const addOrConcat = (a: number, b: number, c: 'add' | 'concat'): number | string => {
    if (c === 'add') {
        return a + b; // Returns a number
    }
    return '' + a + b; // Returns a string
};
```

#### **Explanation:**
- The function adds numbers if the third parameter is `'add'`.
- Otherwise, it concatenates them as strings.

#### **Type Assertion Example:**
```typescript
// Explicitly asserting the return value as a string
let myVal: string = addOrConcat(10, 20, 'concat') as string;

// Double assertion (forcing an invalid cast)
let myVal2: number = addOrConcat(10, 20, 'concat') as number; // ❌ This works in TypeScript but fails at runtime!
console.log(myVal2); // Runtime error: `myVal2` is actually a string!
```

#### **Warning from TypeScript:**
Converting between types like `number` to `string` (or vice versa) when the types **don't overlap** but still force a cast should be done carefully. To avoid pitfalls, you might need to cast via `unknown` first (called **double assertion**).

---

### **Double Assertion (Overriding TypeScript Completely)**
If you are intentionally overriding TypeScript's type-checking, use **double assertions** (`as unknown as T`).

```typescript
(10 as unknown) as string; // Forcibly asserts `10` as a `string`
```

Double assertions can help in migrating legacy JavaScript code but should be avoided for new code.

---

## **3. The DOM and Type Assertions**

### **Why Use Type Assertions in DOM Manipulation?**
When working with DOM elements, TypeScript often infers a type like `Element | null` or `HTMLElement | null`. This is done because DOM queries like `document.querySelector` or `document.getElementById` might return `null` (if the queried element doesn’t exist).

You can use **type assertions** to:
1. Narrow the type further (e.g., from `Element` to `HTMLImageElement`).
2. Indicate to the compiler that the element will never be `null`.

---

### **Examples of Type Assertions in DOM**

#### **Basic Type Assertion Examples**
1. **Using `document.querySelector()`**

The `querySelector()` method infers a type of `Element | null`.

```typescript
const imgById = document.querySelector('#myImg'); // Type: Element | null
if (imgById) {
    imgById.innerHTML = "Hello, from TypeScript!"; // You can safely access DOM properties here.
}
```

To cast (if you know it’s an `HTMLElement`):

```typescript
const imgElement = document.querySelector('#myImg') as HTMLImageElement;
imgElement.src = "image.png"; // Assumes that the queried element is an <img>.
```

---

2. **Using `document.getElementById()`**

The `getElementById()` method infers `HTMLElement | null`.

```typescript
// Direct casting to HTMLImageElement
const imgElement = document.getElementById('myImage') as HTMLImageElement;

// Use type assertion to access specific properties
if (imgElement) {
    imgElement.src = "new-image.png";
}
```

#### **Exclamation Mark (`!`) for Non-Null Assertion**

If you're 100% sure that the DOM element **exists** (e.g., it's statically defined in your HTML), you can use the **non-null assertion operator** (`!`).

```typescript
const img = document.querySelector('img')!; // Assume the <img> tag always exists
img.src = "image.png"; // Access without null-checking
```

**Be Careful!** The `!` operator bypasses `null` checking. If the element doesn’t exist, this will throw a runtime error.

---

#### **Example: Safely Assigning an `<img>` `src`**
```typescript
function setImage(id: string, src: string): void {
    const imgElement = document.getElementById(id) as HTMLImageElement;

    if (imgElement) {
        imgElement.src = src;
    } else {
        console.error(`Element with id "${id}" not found.`);
    }
}

// Safe usage
setImage("heroImage", "hero.jpg");
```

---

### **Handling `null` and Conditional Checks**

Always check for `null` unless you're certain the element exists.

Example with `null` handling:
```typescript
const myDiv = document.querySelector('#container');
if (myDiv !== null) {
    myDiv.innerHTML = "<p>Hello from TypeScript!</p>"; // Safe to use
}
```

---

## **4. Type Abbreviation**

Type abbreviations (e.g., `type`, `interface`) are reusable custom types that simplify repetitive type definitions. They work hand-in-hand with type assertions.

---

### Example of Type Alias with DOM Elements
Using a `type alias` to make DOM manipulation cleaner:
```typescript
type ImageElement = HTMLImageElement | null;

// Safe casting-to-type and usage
const img: ImageElement = document.querySelector('img');
if (img) {
    img.src = "example.jpg";
} else {
    console.error("Image element not found.");
}
```

---

## **Summary**

### **Key Takeaways About Type Assertions:**

1. **Syntax Options**:
   - `value as Type`
   - `<Type>value` (not usable in `.tsx` files).

2. **Single vs. Double Assertions**:
   - `as` is used to narrow or broaden types.
   - Double assertion (`as unknown as Type`) is sometimes necessary to bypass TypeScript when overriding its checks.

3. Best Practices:
   - Use **explicit type assertions** in DOM querying to help TypeScript narrow down types.
   - Prefer **safe null-checks** over the non-null assertion operator (`!`).

4. **Examples of Use Cases**:
   - Working with APIs that return broad types like `unknown`.
   - Manipulating DOM elements with uncertain query results.

---

By using TypeScript's type assertions properly, you can write **safer, more predictable code**, especially when working with ambiguous types. However, use type casting judiciously to avoid bypassing the benefits that TypeScript provides with its static type-checking!