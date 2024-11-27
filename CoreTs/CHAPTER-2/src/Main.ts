// let myName = "Avinashi"; // in this case typescript is infering that myName is a string DataType
let myName : string;;// We are explicitly using type as String instead of infering that myName is a string

// myName = 43; // This is valid in javascript, but typescript will not allow to assign intiger types to astring type

myName = "Sam"

let count : number;
let isLoading: boolean = false;

count = 0;

// We can use any that does not mean we always declare variable as any it will defeat the purpose of typesript
let album: any;// This will behave as it behave in javascript
album = 1999;
album = "Arijit Singh";
album = true;

// Write a function in TypeScript
const sum = (a: number| string, b: number | string)  => a+" " + b+" ";

// Union Type in TypeScript

let primaryKey: string|number;
primaryKey = 1;
primaryKey = "1";
// primaryKey = true; // this is not allowed as we decalred it as union of number or string 

