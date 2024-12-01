Utility types in TypeScript are predefined, built-in types that help transform or manipulate types within your code. They allow you to succinctly handle complex type transformations, such as extracting, omitting, or composing properties, making your code more type-safe and expressive.

Here’s a detailed explanation of the most commonly used **TypeScript Utility Types**, along with examples and use cases.

---

## **1. `Partial<T>`**
### Description:
- This utility makes **all properties** of a given type `T` **optional**.
- Useful when building or updating objects incrementally.

### Example:
```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

const updateUser = (userId: number, userDetails: Partial<User>): User => {
    // Assume we fetch the user and update only the provided properties
    return {
        id: userId, 
        ...userDetails,
    };
};

let partialUser: Partial<User> = { name: "Alice" }; // Only `name` provided
console.log(updateUser(1, partialUser)); // Output: { id: 1, name: 'Alice' }
```

### Use Case:
- When creating or updating only **some** fields of an object, rather than all required fields.

---

## **2. `Required<T>`**
### Description:
- This utility makes **all properties** of a given type `T` **required**.
- Acts as the opposite of `Partial<T>`.

### Example:
```typescript
interface User {
    id: number;
    name?: string; // Optional property
}

const createCompleteUser = (user: Required<User>): void => {
    console.log(user.id, user.name); // Both `id` and `name` are required
};

// createCompleteUser({ id: 1 }); // ❌ Error: Property 'name' is missing
createCompleteUser({ id: 1, name: "Alice" }); // ✅ Works
```

### Use Case:
- Enforcing all optional properties to be required in some scenarios.

---

## **3. `Readonly<T>`**
### Description:
- This utility makes **all properties** of type `T` **readonly**.
- You cannot modify the properties of an object once it's created.

### Example:
```typescript
interface User {
    id: number;
    name: string;
}

const user: Readonly<User> = { id: 1, name: "Alice" };

// user.name = "Bob"; // ❌ Error: Cannot assign to 'name' because it is a read-only property
console.log(user.name); // ✅ Works
```

### Use Case:
- Use in scenarios where the object must remain immutable after being created.

---

## **4. `Record<K, T>`**
### Description:
- Constructs an **object type** where keys `K` are specific string or union values, and values are of type `T`.

### Example:
```typescript
type Roles = "admin" | "editor" | "viewer";

const permissions: Record<Roles, boolean> = {
    admin: true,
    editor: true,
    viewer: false,
};

console.log(permissions.admin); // true
```

### Use Case:
- When mapping a finite set of keys (`K`) to certain values of a specific type (`T`).

---

## **5. `Pick<T, K>`**
### Description:
- Constructs a type by **picking** a set of properties (`K`) from type `T`.

### Example:
```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

type BasicUser = Pick<User, "id" | "name">;

const user: BasicUser = { id: 1, name: "Alice" }; // Only 'id' and 'name' are valid
```

### Use Case:
- Use when you need an object with only a subset of a larger type.

---

## **6. `Omit<T, K>`**
### Description:
- Constructs a type by **omitting** a set of properties (`K`) from type `T`.  
- Acts as the inverse of `Pick<T, K>`.

### Example:
```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

type UserWithoutEmail = Omit<User, "email">;

const user: UserWithoutEmail = { id: 1, name: "Alice" }; // 'email' is omitted
```

### Use Case:
- When you want to **exclude unnecessary properties**.

---

## **7. `Exclude<T, U>`**
### Description:
- Constructs a type by **excluding** from type `T` all union members that are assignable to type `U`.

### Example:
```typescript
type AllRoles = "admin" | "editor" | "viewer";
type AdminOnly = Exclude<AllRoles, "editor" | "viewer">;

const role: AdminOnly = "admin"; // Only 'admin' is allowed
```

### Use Case:
- When you want to selectively remove types from a union.

---

## **8. `Extract<T, U>`**
### Description:
- Constructs a type by **extracting** from type `T` only the union members assignable to type `U`.

### Example:
```typescript
type AllRoles = "admin" | "editor" | "viewer";
type OnlyEditors = Extract<AllRoles, "editor">;

const role: OnlyEditors = "editor"; // Only 'editor' is allowed
```

### Use Case:
- When you want to selectively keep certain types from a union.

---

## **9. `NonNullable<T>`**
### Description:
- Removes `null` and `undefined` from a given type `T`.

### Example:
```typescript
type NullableUser = string | null | undefined;
type NonNullableUser = NonNullable<NullableUser>;

let user: NonNullableUser = "Alice"; // ✅ Works
// let user2: NonNullableUser = null; // ❌ Error: Type 'null' is not assignable
```

### Use Case:
- Prevent `null` or `undefined` in type definitions where non-nullable values are strictly required.

---

## **10. `ReturnType<T>`**
### Description:
- Constructs a type consisting of the **return type** of a function type `T`.

### Example:
```typescript
function getUser(): { id: number; name: string } {
    return { id: 1, name: "Alice" };
}

type UserType = ReturnType<typeof getUser>;

const user: UserType = { id: 1, name: "Alice" };
```

### Use Case:
- To infer the return type of a function dynamically.

---

## **11. `InstanceType<T>`**
### Description:
- Constructs a type consisting of the **instance type** of a given constructor function type `T`.

### Example:
```typescript
class User {
    constructor(public id: number, public name: string) {}
}

type UserInstance = InstanceType<typeof User>;

const user: UserInstance = new User(1, "Alice");
```

### Use Case:
- To infer the instance type of a class.

---

## **12. `Parameters<T>`**
### Description:
- Constructs a tuple type of the **parameters**' types of a function type `T`.

### Example:
```typescript
function add(a: number, b: number): number {
    return a + b;
}

type AddParams = Parameters<typeof add>;

const params: AddParams = [5, 10]; // Tuple of [number, number]
```

### Use Case:
- Useful when you need to dynamically know the parameters of a function type.

---

## **13. `ConstructorParameters<T>`**
### Description:
- Constructs a tuple type of the types of a **constructor function's parameters**.

### Example:
```typescript
class User {
    constructor(public id: number, public name: string) {}
}

type ConstructorParams = ConstructorParameters<typeof User>;

const params: ConstructorParams = [1, "Alice"];
const user = new User(...params);
```

### Use Case:
- Used to extract the constructor parameters for reuse or re-initialization.

---

## **14. `ThisType<T>`**
### Description:
- Used in object literals to specify the type of `this` within the object.

### Example:
```typescript
type ObjectWithHelper = ThisType<{ name: string }>;

const obj: ObjectWithHelper = {
    helper() {
        console.log(this.name); // `this` is inferred as having a `name` property
    },
};
```

### Use Case:
- Used in advanced scenarios for ensuring `this` refers to the correct object type inside methods.

---

## **Use Cases of Utility Types**
| Utility | Use Cases |
|---------|-----------|
| `Partial<T>` | Updating objects incrementally. |
| `Record<K, T>` | Mapping specific keys to values. |
| `Pick<T, K>` | Creating subsets of a type. |
| `Omit<T, K>` | Excluding fields from a type. |
| `NonNullable<T>` | Restricting nullable values. |
| `ReturnType<T>` | Inferring return types dynamically. |
| `ConstructorParameters<T>` | Reusing constructor parameter types. |

---

Utility types streamline type transformations and make TypeScript much more versatile. These are foundational tools in TypeScript that can handle complex type requirements efficiently while maintaining type safety and reducing boilerplate code! 🚀

// Code Exaples

# **Understanding Utility Types in TypeScript**

Utility types in TypeScript simplify common type transformations, making your code more reusable and type-safe. This document explains some of the most frequently used utility types with examples and use cases in the provided code.

---

## **1. `Partial<T>`**
### **What It Does**:
- Makes all properties of a type `T` optional.
- Useful when you only want to update or provide some properties of an object.

### **Example**:
```typescript
interface Assignment {
    stdentId: string;
    title: string;
    grade: number;
    verified?: boolean;
}
const updateAssignment = (assign: Assignment, propsToUpdate: Partial<Assignment>): Assignment => {
    return { ...assign, ...propsToUpdate };
};

const assign1: Assignment = {
    stdentId: "1",
    title: "Maths",
    grade: 85,
};

console.log(updateAssignment(assign1, { grade: 90 })); // Partial allows us to update only `grade`
```

### **Use Case**:
Incrementally updating objects or providing only a subset of properties while keeping type safety.

---

## **2. `Required<T>`**
### **What It Does**:
- Makes all properties of type `T` required, even if they were optional in the original type.

### **Example**:
```typescript
const recordAssignment = (assign: Required<Assignment>): Assignment => {
    // Pretend this gets sent to a database
    return assign;
};

// assignVerified must have all properties explicitly defined
const assignVerified: Required<Assignment> = {
    stdentId: "1",
    title: "Maths",
    grade: 90,
    verified: true,
};
recordAssignment(assignVerified);
```

### **Use Case**:
When an object must have all properties explicitly defined before proceeding.

---

## **3. `Readonly<T>`**
### **What It Does**:
- Makes all properties of a type `T` immutable, meaning they cannot be reassigned.

### **Example**:
```typescript
const assignVerified: Readonly<Assignment> = { ...assign1, verified: true };
// assignVerified.grade = 100; // ❌ Error: Cannot assign to 'grade' because it is a read-only property
```

### **Use Case**:
When you want to prevent accidental mutations of an object after its creation.

---

## **4. `Record<K, T>`**
### **What It Does**:
- Constructs an object type with keys `K` and values of type `T`.

### **Example**:
```typescript
const hexColorMap: Record<string, string> = {
    red: "FF0000",
    green: "00FF00",
    blue: "0000FF",
};

// Using type literals as keys
type Students = "Avi" | "Sam";
type LetterGrades = "A" | "B" | "C" | "D" | "E" | "F";

const finalGrades: Record<Students, LetterGrades> = {
    Avi: "A",
    Sam: "B",
};

// Record mapping complex types
interface InGrades {
    assign1: number;
    assign2: number;
}
const inGradeData: Record<Students, InGrades> = {
    Avi: { assign1: 90, assign2: 85 },
    Sam: { assign1: 95, assign2: 90 },
};
```

### **Use Case**:
Creating mappings between keys and values with precise type safety (e.g., storing user roles or grades).

---

## **5. `Pick<T, K>`**
### **What It Does**:
- Constructs a type by selecting specific properties (`K`) from a type `T`.

### **Example**:
```typescript
type AssignResult = Pick<Assignment, "stdentId" | "grade">;
const score: AssignResult = {
    stdentId: "1",
    grade: 90,
};
```

### **Use Case**:
Creating a subset of a larger type, typically for APIs or UI components.

---

## **6. `Omit<T, K>`**
### **What It Does**:
- Constructs a type by excluding specific properties (`K`) from a type `T`.

### **Example**:
```typescript
type AssignPreview = Omit<Assignment, "grade" | "verified">;
const preview: AssignPreview = {
    stdentId: "1",
    title: "Maths",
};
```

### **Use Case**:
When you need a type that has most, but not all, properties of the original type.

---

## **7. `Exclude<T, U>`**
### **What It Does**:
- Constructs a type by removing all members of `T` that are assignable to `U`.

### **Example**:
```typescript
type adjustedGrade = Exclude<LetterGrades, "F">; // Remaining: "A" | "B" | "C" | "D" | "E"
```

### **Use Case**:
Filtering out unwanted members from unions.

---

## **8. `Extract<T, U>`**
### **What It Does**:
- Constructs a type by extracting all members of `T` that are assignable to `U`.

### **Example**:
```typescript
type highGrade = Extract<LetterGrades, "A" | "B">; // Remaining: "A" | "B"
```

### **Use Case**:
Narrowing a union type to only the members you need.

---

## **9. `NonNullable<T>`**
### **What It Does**:
- Removes `null` and `undefined` from `T`.

### **Example**:
```typescript
type AllPossibleGrades = "Dave" | "John" | null | undefined;
type NamesOnly = NonNullable<AllPossibleGrades>; // "Dave" | "John"
```

### **Use Case**:
Ensuring that a variable cannot have `null` or `undefined` values when optionality is not allowed.

---

## **10. `ReturnType<T>`**
### **What It Does**:
- Extracts the return type of a function.

### **Example**:
```typescript
const createNewAssign = (title: string, point: number) => {
    return { title, point };
};

type NewAssign = ReturnType<typeof createNewAssign>; // { title: string; point: number }

const tsAssign: NewAssign = createNewAssign("Maths", 100);
console.log(tsAssign); // Output: {title: "Maths", point: 100}
```

### **Use Case**:
Extracting the return type of a function for reuse in type annotations.

---

## **11. `Parameters<T>`**
### **What It Does**:
- Constructs a tuple type that's made up of the parameters of a function type `T`.

### **Example**:
```typescript
type AssignParams = Parameters<typeof createNewAssign>; // [string, number]

const assignArgs: AssignParams = ["Generics", 100];
const tsAssign2: NewAssign = createNewAssign(...assignArgs);
console.log(tsAssign2); // Output: {title: "Generics", point: 100}
```

### **Use Case**:
Reusing function parameter types elsewhere in your code.

---

## **12. `Awaited<T>`**
### **What It Does**:
- Extracts the resolved type of a `Promise`.

### **Example**:
```typescript
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

const fetchUser = async (): Promise<User[]> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    return res.json();
};

// Using Awaited to get the returned type
type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUser>>;
fetchUser().then((users: FetchUsersReturnType) => console.log(users));
```

### **Use Case**:
When dealing with asynchronous code, to infer the type of the resolved value of a `Promise`.

---

## **Summary of Utility Types**

| Utility Type         | Description                                         |
|-----------------------|-----------------------------------------------------|
| `Partial<T>`          | Makes all properties optional.                     |
| `Required<T>`         | Makes all properties required.                     |
| `Readonly<T>`         | Makes the properties readonly.                     |
| `Record<K, T>`        | Maps keys of type `K` to values of type `T`.        |
| `Pick<T, K>`          | Picks certain properties from type `T`.            |
| `Omit<T, K>`          | Omits certain properties from type `T`.            |
| `Exclude<T, U>`       | Excludes members of `T` assignable to `U`.          |
| `Extract<T, U>`       | Extracts members of `T` assignable to `U`.          |
| `NonNullable<T>`      | Removes `null` and `undefined` from a type.         |
| `ReturnType<T>`       | Extracts the return type of a function.             |
| `Parameters<T>`       | Extracts the parameters of a function as a tuple.   |
| `Awaited<T>`          | Extracts the resolved type of a `Promise`.          |

---

These utility types are essential when working with complex type transformations in TypeScript. They help you write code that's both reusable and adheres to strong type safety principles. 🚀