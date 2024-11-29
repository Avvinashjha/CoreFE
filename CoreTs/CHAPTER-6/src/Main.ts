// Index signature

// Index is used when you are creating the object but you don't know the exact keys but you know the shape of the object
// and you can dec


//if you want to access propert dynamicaly

interface TracnsactionObj {
    Pizza: number,
    Books: number,
    Job: number
}

const transactionToday: TracnsactionObj = {
    Pizza: 10,
    Books: 20,
    Job: 30
}

console.log(transactionToday.Pizza);
console.log(transactionToday["Books"]);

let prop: string = "Pizza";

// Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'TracnsactionObj'.
//   No index signature with a parameter of type 'string' was found on type 'TracnsactionObj'.
// console.log(transactionToday[prop]);

// const todaysNet = (transactions: TracnsactionObj): number =>{
//     let total: number = 0;
//     for(const tramnaction in transactions){
//         total += transactions[tramnaction];
//     }
//     return total;
// }

console.log();


// Lets see how index signature works

// This is an index where we are indicating that all key will be string and value will be number and we can use union as well
interface indexedTransactionObj {
   readonly [index: string]: number
}

const indexedTransactionToday: indexedTransactionObj = {
    Pizza: 10,
    Books: 20,
    Job: 30,
    "Electronics": 40
}

let prop1: string = "Pizza";

// now we can use these dynamic key
console.log(indexedTransactionToday[prop1]);
const todaysNet = (transactions: indexedTransactionObj): number =>{
    let total: number = 0;
    for(const tramnaction in transactions){
        total += transactions[tramnaction];
    }
    return total;
}

console.log(todaysNet(indexedTransactionToday));

// Only edge case is if that property is not present 
console.log(indexedTransactionToday["Hello"]);// it will return undefined

// i9t is not nessesary that we will only have indexed prams we can declare always needed key value in the interface
interface indexedTransactionObj1 {
   [index: string]: number,
   Pizza: number,
   Books: number,
   Job: number
}

// here Pizza, books and jobs are indexed and need to be declared
const indexedTransactionToday1: indexedTransactionObj1 = {
    Pizza: 10,
    Books: 20,
    Job: 30,
    "Electronics": 40,
    Hello: 50
}

////////////////////////////////
// Lets see if index is not present then how can we iterate using type assertion

interface Student { 
    // [index:string]: number| string | number[] | undefined // we have to pass all datatype that are used in the interface to make a index
    name: string,
    GPA: number,
    classes?: number[]
}

const student : Student = {
    name: "John Doe",
    GPA: 3.5,
    classes: [101, 102, 103] // rember classes is option if you will not poass it will not show any issue 
}

// console.log(student["hello"]); // now to use this we have to add indexing because it's no in the student interface

for(const key in student) {
    console.log(`${key} : ${student[key as keyof Student]}`); // what key of is union type of the all the key present in interface
    
}

Object.keys(student).forEach(key => {
    console.log(student[key as keyof typeof student]);  
})

const logStudentKey = (student: Student, key: keyof Student) => {
    console.log(student[key as keyof typeof student]);
    
}


////////////////////////////////////////////////////////////////

interface Incomes {
    [key: string]: number;// key: value
}

type Streams = 'salary' | 'bonus' | 'sideHusles';

type Income1 = Record<Streams, number| string>;

const monthlyIncomes : Income1 = {
    salary: 5000,
    bonus: 1000,
    sideHusles: 2000,
    // lesson:3000 //Object literal may only specify known properties, and 'lesson' does not exist in type 'Income1'
}

for (const revenue in monthlyIncomes){
    console.log(monthlyIncomes[revenue as keyof Income1]);
    
}