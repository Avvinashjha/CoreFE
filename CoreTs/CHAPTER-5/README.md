# **Object-Oriented Programming (OOP) in TypeScript**

Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects," which can contain data (properties) and methods (functions). TypeScript, being a superset of JavaScript, introduces powerful features like stricter types, class-based structure, access modifiers, inheritance, interfaces, and more to implement OOP effectively.

This guide will walk you through OOP concepts in TypeScript with **examples** and **use cases**.

---

## **1. Core Concepts of OOP**

The four fundamental principles of OOP are:
1. **Encapsulation**
2. **Inheritance**
3. **Polymorphism**
4. **Abstraction**

---

## **2. Class in TypeScript**

A **class** is a blueprint to create objects with specific properties and methods.

### Example: A Simple Class

```typescript
class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(): void {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

// Create an instance of the Person class
const john = new Person("John", 30);
john.greet(); // Output: Hello, my name is John and I am 30 years old.
```

#### Use Case:
- Use classes to model real-world entities like `Car`, `User`, or `Product` with attributes (properties) and behaviors (methods).

---

## **3. Encapsulation**

Encapsulation is the process of bundling data and methods together and restricting direct access to the internal state of an object using access modifiers.

### Access Modifiers in TypeScript:
1. **`public`** (default): Members are accessible anywhere.
2. **`private`**: Members are accessible only within the class itself.
3. **`protected`**: Members are accessible within the class and its subclasses.

### Example: Encapsulation with Access Modifiers

```typescript
class BankAccount {
    private balance: number;

    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    withdraw(amount: number): void {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
        }
    }

    getBalance(): number {
        return this.balance;
    }
}

// Usage
const myAccount = new BankAccount(100);
myAccount.deposit(50);
myAccount.withdraw(30);
console.log(myAccount.getBalance()); // Output: 120
// myAccount.balance = 1000; // ❌ Error: Property 'balance' is private
```

#### Use Case:
- Use encapsulation to ensure certain sensitive data (like a user's password, bank balance, or API keys) is not exposed to direct manipulation.

---

## **4. Inheritance**

Inheritance allows a class (child class) to inherit from another class (parent class). The child class can reuse the parent class properties and methods or override them.

### Example: Inheritance in Action

```typescript
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    speak(): void {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name); // Call the parent class constructor
    }

    speak(): void {
        console.log(`${this.name} barks.`);
    }
}

// Usage
const animal = new Animal("Generic Animal");
animal.speak(); // Output: Generic Animal makes a noise.

const dog = new Dog("Buddy");
dog.speak(); // Output: Buddy barks.
```

#### Use Case:
- Inheritance is used when you want to build a hierarchy. For instance, a `Vehicle` base class can have child classes like `Car`, `Bike`, or `Truck`.

---

## **5. Polymorphism**

Polymorphism means "many forms" and allows methods in different classes to have the **same name** but exhibit **different behavior** depending on the object.

### Example: Polymorphism with Method Overriding

```typescript
class Shape {
    area(): void {
        console.log("Calculating area...");
    }
}

class Circle extends Shape {
    radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    area(): void {
        console.log(`Circle area: ${Math.PI * this.radius * this.radius}`);
    }
}

class Rectangle extends Shape {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }

    area(): void {
        console.log(`Rectangle area: ${this.width * this.height}`);
    }
}

// Usage
const shapes: Shape[] = [new Circle(5), new Rectangle(10, 20)];

shapes.forEach((shape) => shape.area());
// Output:
// Circle area: 78.53981633974483
// Rectangle area: 200
```

#### Use Case:
- Use polymorphism when multiple classes have common behavior, such as calculating area in `Shape`, calculating tax for `Product`, or rendering UI components.

---

## **6. Abstraction**

Abstraction is the process of hiding the implementation details of a class and exposing only what is necessary through **abstract classes** or **interfaces**.

### a. Abstract Classes

An abstract class provides a base class with common properties or methods but enforces subclasses to implement specific methods.

```typescript
abstract class Employee {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract calculateSalary(): number;

    describe(): void {
        console.log(`Employee: ${this.name}`);
    }
}

class FullTimeEmployee extends Employee {
    annualSalary: number;

    constructor(name: string, annualSalary: number) {
        super(name);
        this.annualSalary = annualSalary;
    }

    calculateSalary(): number {
        return this.annualSalary;
    }
}

class PartTimeEmployee extends Employee {
    hourlyRate: number;
    hoursWorked: number;

    constructor(name: string, hourlyRate: number, hoursWorked: number) {
        super(name);
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    calculateSalary(): number {
        return this.hourlyRate * this.hoursWorked;
    }
}

// Usage
const emp1 = new FullTimeEmployee("John", 50000);
const emp2 = new PartTimeEmployee("Jane", 20, 100);

console.log(emp1.calculateSalary()); // Output: 50000
console.log(emp2.calculateSalary()); // Output: 2000
```

---

### b. Interfaces

An interface defines the structure of a class or object but doesn’t provide any implementation.

```typescript
interface Vehicle {
    wheels: number;
    drive(): void;
}

class Car implements Vehicle {
    wheels = 4;

    drive(): void {
        console.log("Driving a car...");
    }
}

class Bike implements Vehicle {
    wheels = 2;

    drive(): void {
        console.log("Riding a bike...");
    }
}

// Usage
const myVehicle: Vehicle = new Car();
myVehicle.drive(); // Output: Driving a car...
```

#### Abstraction Example Use Case:
- Interfaces or abstract classes are used when building large systems that involve enforcing a consistent structure, such as services or APIs.

---

## **7. Static Methods and Properties**

Static members belong to the class itself and not to any particular instance.

```typescript
class MathUtils {
    static PI = 3.14159;

    static calculateCircumference(radius: number): number {
        return 2 * MathUtils.PI * radius;
    }
}

// Usage
console.log(MathUtils.PI); // Output: 3.14159
console.log(MathUtils.calculateCircumference(10)); // Output: 62.8318
```

---

## **8. Getters and Setters**

Used to control access to properties.

```typescript
class Person {
    private _age: number;

    constructor(age: number) {
        this._age = age;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        if (value >= 0) {
            this._age = value;
        } else {
            console.log("Age must be a positive number.");
        }
    }
}

// Usage
const person = new Person(25);
console.log(person.age); // Output: 25
person.age = -5; // Output: Age must be a positive number
```

---

## **Practical Use Cases**

1. **Modeling Real-World Entities**:
   - Use classes to represent objects like `User`, `Product`, `Order`, or `Shape`.

2. **Scalable Codebases**:
   - Leverage inheritance, polymorphism, and abstraction to build reusable, modular, and maintainable code.

3. **Service Layers**:
   - Use interfaces and abstract classes to implement consistent service APIs in backend systems.

4. **Game Development**:
   - Represent entities like `Player`, `Enemy`, or `Weapon`, with hierarchical structures and behaviors.

---

By combining **real-world modeling**, **strict typing**, and the **features of OOP**, TypeScript enables you to build highly extensible and scalable applications. Happy coding! 🚀

# **Object-Oriented Programming in TypeScript: Classes, Access Modifiers, Interfaces, and More**

This document explains and provides examples of key OOP concepts in TypeScript, including classes, access modifiers, inheritance, interfaces, `static` keyword, and getter/setters.

---

## **1. Classes in TypeScript**

A **class** is a blueprint for creating objects. TypeScript supports classes that allow you to define properties, methods, and constructors for objects.

### Reducing Redundancy in Classes
In TypeScript, class constructors often require you to initialize properties with incoming parameters. However, writing this explicitly can lead to redundancy.

#### Example:
```typescript
class Coder {
    name: string;
    music: string;
    age: number;
    lang: string;

    constructor(name: string, music: string, age: number, lang: string) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
}
```

In this class:
- There **is redundancy** in initializing the properties with the same names as constructor arguments.
- TypeScript provides access modifiers (e.g., `public`, `private`) to alleviate this.

---

### **Assertions in Classes**

**Assertion** using `!` operator tells TypeScript compiler that the property will definitely have a value **later** in the program, even if it's not initialized in the constructor. 

#### Example:
```typescript
class Coder1 {
    name: string;
    music: string;
    age: number;
    lang: string;
    secondLang!: string; // Assertion: This property will be given a value later

    constructor(name: string, music: string, age: number, lang: string) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
}
```

#### Why Use Assertions?
- The `secondLang!` property is not initialized in the constructor but can still be used later.
- TypeScript trusts the developer's intent but does not enforce runtime checks, so use `!` carefully.

---

### **Access Modifiers**

Access modifiers (`public`, `private`, `protected`) control the accessibility of class properties and methods.

#### Key Concepts:
1. **`public`** (Default):
   - Accessible everywhere (inside and outside the class).
   - Explicitly writing it is optional (it is assumed by default).

2. **`private`:**
   - Accessible only within the class where it is defined.
   - External or inherited access is not allowed.

3. **`protected`:**
   - Accessible within the class and its subclasses (but not outside).

---

#### Access Modifier Example
```typescript
class Coder2 {
    constructor(
        public readonly name: string,  // `readonly`: Property cannot be modified
        public music: string,
        private age: number,           // `private`: Accessible only within the class
        protected lang: string = "typescript"   // `protected`: Subclasses can access
    ) {}

    public getAge(): number {
        return this.age; // Allowed because it's within the class
    }
}

// Usage
const coderObj1 = new Coder2("Sam", "Escobar", 25); 
console.log(coderObj1.name); 
// console.log(coderObj1.age); // ❌ Error: 'age' is private
// coderObj1.name = "NewName"; // ❌ Error: 'name' is readonly
```

---

## **2. Inheritance**

Inheritance allows one class (child) to inherit properties and methods from another class (parent).

### Example: Extending a Class
```typescript
class WebDev extends Coder2 {
    constructor(
        public computer: string,
        name: string,
        age: number,
        music: string
    ) {
        super(name, music, age); // Call the parent class constructor
        this.computer = computer;
    }

    public getLanguage(): string {
        return `I write ${this.lang}`; // Access 'protected' property
    }
}

// Usage
const sam = new WebDev("Windows", "Sam", 24, "Rock");
console.log(sam.getLanguage()); // Output: I write typescript
```

### Key Inheritance Features:
- Child classes can extend parent classes using `extends`.
- The `super()` keyword is used to call the parent class's constructor and methods.
- `protected` fields allow subclasses to access and override parent-class fields.

---

## **3. Interfaces**

An **interface** is a **contract** that a class must adhere to—it defines the structure of classes or objects.

### Example: Implementing an Interface
```typescript
interface Student {
    readonly name: string;  // Readonly: Cannot be changed once defined
    age: number;
    grade: string;
    scores: number[];
    greet(name: string): string;  // Must implement this method
}

class Student1 implements Student {
    readonly name: string;
    age: number;
    grade: string;
    scores: number[];

    constructor(name: string, age: number, grade: string, scores: number[]) {
        this.name = name;
        this.age = age;
        this.grade = grade;
        this.scores = scores;
    }

    public greet(name: string): string {
        return `Hello ${name}! I am ${this.name}`;
    }
}

// Usage
const student1 = new Student1("Avinash", 23, "One", [90, 85, 88]);
console.log(student1.greet("Sam")); // Output: Hello Sam! I am Avinash
// student1.name = "Someone Else"; // ❌ Error: 'name' is readonly
```

---

## **4. Static Properties and Methods**

A `static` keyword declares class members (methods or properties) that belong to the class itself, rather than any instance of the class.

### Example: Static Property Example
```typescript
class Player {
    static count: number = 0; // Shared among all instances

    name: string;
    id: number;

    constructor(name: string) {
        this.name = name;
        this.id = ++Player.count; // Auto-increment IDs per player
    }

    static getPlayerCount() {
        return Player.count; // Use 'Player' class name to access static properties
    }
}

// Usage
const player1 = new Player("Avinash");
const player2 = new Player("Sam");

console.log(Player.count); // Output: 2 (shared static property)
console.log(Player.getPlayerCount()); // Output: 2
```

- **Static properties** are shared by all instances.
- **Static methods** are invoked directly using the class name (e.g., `Player.getPlayerCount()`).

---

## **5. Getters and Setters**

Getters (`get`) and setters (`set`) control access to private class properties.

### Example: Getter and Setter
```typescript
class Bands {
    private dataState: string[];

    constructor() {
        this.dataState = [];
    }

    // Getter
    public get data(): string[] {
        return this.dataState;
    }

    // Setter
    public set data(value: string[]) {
        if (Array.isArray(value) && value.every(el => typeof el === 'string')) {
            this.dataState = value;
        } else {
            throw new Error("Invalid data type");
        }
    }
}

// Usage
const myBands = new Bands();
myBands.data = ["Metallica", "Nirvana"]; // Use setter to modify the data
console.log(myBands.data); // Use getter to access the data
```

---

## **Key Concepts**

### **Access Modifiers Recap**
| Modifier   | Where Accessible                                         |
|------------|----------------------------------------------------------|
| `public`   | Anywhere (default in TypeScript).                        |
| `private`  | Only within the class it’s declared in.                  |
| `protected`| Within the class and its subclasses.                     |
| `readonly` | Value can be accessed but not modified.                  |

### **Static Keywords**
- **Belongs to the class**, not instances.
- Shared across all instances of the class.

### **Getters/Setters**
- Allow controlled access to private fields.
- Validate or transform data before storing or retrieving it.

---

## **Use Cases of OOP in TypeScript**

1. **Encapsulation**:
   - Secure sensitive data, like bank accounts, passwords, or credentials.

2. **Inheritance**:
   - Reuse common functionalities (e.g., `Vehicle` base class for `Car`, `Bike`).

3. **Interfaces**:
   - Define consistent structure for APIs, models, and services.

4. **Static Members**:
   - Count total objects, implement shared utility methods (e.g., `Math`, `Utility`).

5. **Getters and Setters**:
   - Apply validation or constraints when manipulating private fields.

By combining these features, you can build systems that are **modular**, **scalable**, and **easy to maintain**, while taking advantage of TypeScript's strong typing and OOP capabilities. Happy coding! 🚀