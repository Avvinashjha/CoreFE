// Array In Typescript

let stringArr: string[] = ["avinash", "sam", "rock"]

let mixedArr:(string| number | boolean)[] = ["2022", 2024, true]

// Re assign Number to the above string array
//stringArr[0] = 120;// Number can not be assigned to a string array

// Lets push new value to the string array
// stringArr.push(123);// argument of type number is not assignable to parameter of type string


let myTuple: [string, number, boolean]= ["Avinash", 90, true];

myTuple.push(123);// argument

console.log(myTuple);
