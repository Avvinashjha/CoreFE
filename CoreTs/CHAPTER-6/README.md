# **TypeScript: Index Signatures, Keyof, and Dynamic Object Handling**

In TypeScript, **index signatures** provide flexibility when the shape of an object is dynamic (i.e., when you don't know the exact keys but you know the structure). This document describes how to define and work with objects with index signatures, iterate over their keys, and safely access dynamic properties.

---

## **Key Concepts**

### 1. **Index Signatures**
An **index signature** is a way to define the shape of an object when:
- You don't know all the key names beforehand.
- The keys may vary, but you know the **type of the keys** and the **type of their corresponding values**.

### 2. **Dynamic Key Access**
Dynamic property access (e.g., `transactionToday[prop]`) allows you to get or set properties of an object dynamically. However, this may require explicit typing or assertions for TypeScript to provide type safety.

### 3. **Iterating Over Objects**
When iterating over objects in TypeScript, you must use `keyof` or assertions in scenarios where TypeScript isn't aware of the structure during iteration.

### 4. **Type Utilities**
- **`keyof`**: A union type of the keys in an object or interface.
- **`Record<Keys, Type>`**: A utility type that simplifies creating key-value mappings.

---

## **Documentation of the Code**

### **1. Basic Index Signature Usage**

#### Example with Explicitly Defined Keys
```typescript
interface TransactionObj {
    Pizza: number,
    Books: number,
    Job: number
}

const transactionToday: TransactionObj = {
    Pizza: 10,
    Books: 20,
    Job: 30
};

console.log(transactionToday.Pizza);       // Accessing using dot notation
console.log(transactionToday["Books"]);   // Accessing dynamically using bracket notation
```

#### **Explanation**
- The interface `TransactionObj` defines an object where the keys are explicitly named (`Pizza`, `Books`, `Job`), and their corresponding values are of type `number`.
- When accessing dynamically using a variable key like `transactionToday[prop]`, TypeScript may throw errors if the key's type is not explicitly defined as part of the object structure.

---

#### **Dynamic Key Access Error**
```typescript
let prop: string = "Pizza";
// console.log(transactionToday[prop]); // ❌ Error
```

### **Why the Error?**
- TypeScript doesn't allow you to use an arbitrary `string` to index `TransactionObj` because not all `string` values exist as keys.
- To handle this, you can use **index signatures**.

---

### **2. Defining Index Signatures**

#### Example: Dynamic Keys with Index Signature
```typescript
interface IndexedTransactionObj {
    readonly [index: string]: number;  // Any string as keys, and values must be numbers
}

const indexedTransactionToday: IndexedTransactionObj = {
    Pizza: 10,
    Books: 20,
    Job: 30,
    Electronics: 40
};

let prop1: string = "Pizza";
console.log(indexedTransactionToday[prop1]); // ✅ No error, thanks to index signature
```

**Key Features:**
1. `[index: string]: number`: This means any key (of type `string`) may exist, and its value will always be a `number`.
2. `readonly`: Prevents modification of properties after they are set.

#### Edge Case
```typescript
console.log(indexedTransactionToday["NonExistentKey"]); // ✅ Output: undefined
```
- Accessing a key that doesn't exist doesn't throw an error; instead, it returns `undefined`.

---

### **3. Combining Index Signatures with Explicit Keys**

#### Example
It is possible to combine **explicitly stated properties** with a more general **index signature** in the same interface.

```typescript
interface IndexedTransactionWithKeys {
    [index: string]: number; // Dynamic keys
    Pizza: number;
    Books: number;
    Job: number;
}

const indexedTransactionToday1: IndexedTransactionWithKeys = {
    Pizza: 10,
    Books: 20,
    Job: 30,
    Electronics: 40,
    Hello: 50
};
```

#### **Behavior**
- `Pizza`, `Books`, and `Job` are **required properties**.
- Other keys (dynamic keys) are allowed as long as their values are numbers.

---

### **4. Iterating Over an Object**

To iterate over the keys of an object:
1. Use a `for...in` loop.
2. Use `Object.keys()` to get an array of keys.

#### Issue with Dynamic Access
Without an index signature, dynamic property access will throw an error during iteration because TypeScript cannot guarantee the property will exist.

---

#### **Example with `keyof` and Assertions**

```typescript
interface Student {
    name: string;
    GPA: number;
    classes?: number[]; // Optional property
}

const student: Student = {
    name: "John Doe",
    GPA: 3.5,
    classes: [101, 102, 103]
};

for (const key in student) {
    console.log(`${key} : ${student[key as keyof Student]}`); 
    // Use `keyof Student` to restrict access to known keys
}
```

#### `Object.keys()` Example
```typescript
Object.keys(student).forEach(key => {
    console.log(student[key as keyof typeof student]);  
});
```

---

### **5. Custom Utilities: `keyof` and `Record`**

#### Using the `keyof` Operator
`keyof` provides a union type of all keys in a given interface or type.

```typescript
const logStudentKey = (student: Student, key: keyof Student) => {
    console.log(student[key]); // Access safe keys
};

logStudentKey(student, "name");  // ✅ Works
// logStudentKey(student, "unknown"); // ❌ Error: 'unknown' is not a key of 'Student'
```

#### Using `Record` Utility Type
The `Record<Keys, Type>` utility is used to easily define key-value mappings.

```typescript
type Streams = 'salary' | 'bonus' | 'sideHustles';
type Income1 = Record<Streams, number | string>;

const monthlyIncomes: Income1 = {
    salary: 5000,
    bonus: 1000,
    sideHustles: 2000
    // lesson:3000 // ❌ Error: 'lesson' is not part of the 'Streams' type
};

for (const revenue in monthlyIncomes) {
    console.log(monthlyIncomes[revenue as keyof Income1]);
}
```

#### **Explanation**
- `Record<Streams, number | string>`:
  - `Streams` is a union type ('salary' | 'bonus' | 'sideHustles').
  - Each key in `Streams` must have a value of type `number | string`.

---

## **Key Takeaways**

### **1. Index Signatures**
- Use index signatures (`[index: string]: ValueType`) to manage objects with unpredictable keys and consistent value types.
  
#### Example:
```typescript
interface Transaction {
    [key: string]: number; // Keys are strings, values are numbers
}
```

### **2. keyof**
- Use the `keyof` operator to constrain keys dynamically.
  
#### Example:
```typescript
function logKey<T>(obj: T, key: keyof T): void {
    console.log(obj[key]);
}
```

### **3. Record Utility**
- Use `Record<Keys, Type>` for scenarios where keys and value types are predefined.

---

## **Common Use Cases**

1. **Dynamic APIs**:
   - APIs that return unpredictable key-value pairs (e.g., a list of transactions).

2. **Iterating over Objects**:
   - Safely loop through objects where properties may vary dynamically.

3. **Key Constraint Enforcement**:
   - Use `keyof` or `Record` to enforce stricter rules on object keys and structure.

4. **Optional Properties with Index**:
   - Combine optional fields and dynamic keys in a single interface for flexibility in dealing with real-world data models.

By using these concepts effectively, we can handle dynamic keys, safely access object properties, and maintain type safety even in uncertain scenarios.