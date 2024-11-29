// String aray
// Here typescript infers that this is a array with only type string 
let stringArray = ['one', 'two', 'three'];
// If I will try to add another element to the array then it will give error 
// stringArray.push(4); <--- Argument of type 'number' is not assignable to parameter of type 'string'.

// String and number array
let player = ['virat', 2007, true];
player[0] = 20;
// player.push(true);<--- Argument of type 'boolean' is not assignable to parameter of type 'string | number'.

let test = []; // this is any type

let brands : string[] = []; // this is string array

brands.push("Nike");
// brands.push(1);

// Tuple Type

let myTuple: [string, number, boolean] = ["Sachin", 1995, true];

myTuple[0] = "virate";

// myTuple[0] = 1;//Type 'number' is not assignable to type 'string'

//myTuple = player;//Type '(string | number | boolean)[]' is not assignable to type '[string, number, boolean]'.
//Target requires 3 element(s) but source may have fewer

player = myTuple;

// Objects

let myObject: Object;
myObject = [];

console.log(typeof myObject);

myObject = myTuple;

const obj1 = {
    prop1: "Sachin",
    prop2: 1995,
    prop3: true
}

// obj1.prop3 = 1;//Type 'number' is not assignable to type 'boolean'

type Player = {
    name: string,
    age: number,
    isRetired: boolean,
    scores: (string | number)[]
}


let player1:Player = {
    name: "Sachin",
    age: 1995,
    isRetired: true,
    scores: ["100", "200", 300]
}

//Property 'age' is missing in type '{ name: string; isRetired: true; scores: (string | number)[]; }' but required in type 'Player'.
// let player2:Player = {
//     name: "Sachin",
//     isRetired: true,
//     scores: ["100", "200", 300]
// }


//Property 'age' is missing in type '{ name: string; isRetired: false; scores: (string | number)[]; }' but required in type 'Player'.
// let player3: Player = {
//     name: "Virat",
//     isRetired: false,
//     scores: ["100", "200", 300]
// }


//Property 'wife' does not exist on type 'Player'.
// player3.wife = "anushka";

// make a prop as optional
// age is optional in this
type PlayerOptional = {
    name?: string,
    age?: number,
    isRetired: boolean,
    scores: (string | number)[]
}

// you can pass age in this
let playerOptional1 = {
    name: "Sachin",
    age: 22,
    isRetired: true,
    scores: ["100", "200", 300]
}

// you can avoid this by passing
let playerOptional2 = {
    isRetired: false,
    scores: ["100", "200", 300]
}


const geetPlayer = (player: { name: string, age: number, isRetired: boolean, scores: (string| boolean)[] }) =>{
    console.log(`Name: ${player.name}, Age: ${player.age}, Retired: ${player.isRetired}, Scores: ${player.scores.join(", ")}`);
}

//'player.name' is possibly 'undefined'. to avoid that typescript will add undefined check
const geetPlayer2 = (player: PlayerOptional) =>{
    console.log(`Name: ${player.name?.toLowerCase()}, Age: ${player.age}, Retired: ${player.isRetired}, Scores: ${player.scores.join(", ")}`);
}

// Or we can implement narrowing
// Typescript realizes in advance
const geetPlayer3 = (player: PlayerOptional) =>{
    if(player.name){
        console.log(`Name: ${player.name.toLowerCase()}, Age: ${player.age}, Retired: ${player.isRetired}, Scores: ${player.scores.join(", ")}`);
    }else{
        console.log("Name not provided");
    }
}

// we can use type and interface alternately
geetPlayer3(playerOptional2)


// Enums
// What is Enum and 
// Unlike Most typescript features Enums are not a type-=level addition to javascript but something added to the laguage and runtime

enum Grade {
    F = 1, // can change the start
    E, 
    D,
    C,
    B,
    A
}


let myGrade: Grade = Grade.A;

console.log(myGrade); // 6


// Type alias

type stringOrNumber = string | number;

type stringOrNumberArray = (string | number)[];

type Student = {
    name: string,
    age: stringOrNumber,
    grade: Grade,
    scores: stringOrNumberArray
}

type UseId = stringOrNumber;

// Difference between type and interface
//'stringOrNumber' only refers to a type, but is being used as a value here.
// interface postId = stringOrNumber;


// Literal type
// this is usefull when you use union type
let myName : "Avinash";

//Type '"Sam"' is not assignable to type '"Avinash"'
// myName = "Sam";


// union type literals
let userName : "Avinash" | "Sam" | "Sharma";

userName = "Sharma";

userName = "Avinash";

//Type '"John"' is not assignable to type '"Avinash" | "Sam" | "Sharma"'
// userName = "John";

// Function

const add  = ( a: number, b: number): number => {
    return a + b;
}

const logMessage = (message: any) => {
    console.log(message);
}

logMessage("hello");

logMessage(add(2,3));


let sub = function (c: number, d: number) : number {
    return c - d;
}

// notice we are using smae a ,b as number and c, d as number so we can use type here

type mathFunction = (a: number, b: number) => number;

let multiply: mathFunction = (a, b) => {
    return a * b;
}

// we can use interface too

interface mathFunctionInterface {
    (a: number, b: number) : number
}

let divide: mathFunctionInterface = (a, b) => {
    return a / b;
}


// optional Prams

// NOTE: if you have optional prams then it must come in the end
const addAll = (a: number, b: number, c?: number): number =>{
    //'c' is possibly 'undefined'.
    // to remove the 'undefined' error we need to put a type quard
    if(typeof c !== 'number'){
        return a + b;
    }
    return a + b + c;
}

// Default Value
// if your last prams has default value then that will work fine otherwise if you are passing the vaue then it will apply as first, secoind ....
const sumAll = (a: number, b: number, c: number = 2): number => {
    return a + b + c;
}

// in this case while calling the function you need to explicitly pass undefined for that prams such that it can use default value
// we can not use default value in alias
const mulAll = (a: number = 10, b: number, c: number): number => {
    return a * b * c;
}

//Expected 3 arguments, but got 2.
// console.log(mulAll(10, 10));
console.log(mulAll(undefined, 10, 10));// 10 * 10 * 10


// rest prams
// rest operator should come at the end
const sumAllRest = (...numbers: number[]): number => {
    return numbers.reduce((a, b) => a + b, 0);
}

console.log(sumAllRest(1,2,3,4,5)); // 15




console.log(addAll(1,2,3)); // 
console.log(addAll(1,2));

console.log(sumAll(1,2));


// Never type and It's usecase

// so the return type of this function is never why?
// function that explicitly throw error
const createError =  (errMsg: string) =>{
    throw new Error(errMsg);
}

// this will return never because it will never return
const inf = () => {
    let  i = 0;
    while(true){
        i++;
        break;
    }
}

const numberOrString = (value: number | string) : string=>{
    if(typeof value === 'string') return 'string';
    if(typeof value === 'number') return 'number';
    return createError("this is error message")
}


