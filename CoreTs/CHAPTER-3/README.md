## Array in Typescript
- We can define the type constaints while declaring the array
- Size of array is flexible and array can have only allowed types only

```ts
let stringArr: string[] = ["avinash", "sam", "rock"]

let mixedArr:(string| number | boolean)[] = ["2022", 2024, true]


// Re assign Number to the above string array
//stringArr[0] = 120;// Number can not be assigned to a string array

// Lets push new value to the string array
// stringArr.push(123);// argument of type number is not assignable to parameter of type string
```

## Tuple in Typescript
