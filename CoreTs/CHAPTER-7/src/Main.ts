// Generics 

// this function is fine but it will only work for sting 
const stringEcho = (arg: string) : string => arg

// Now if we want to write a generalized defination
const echo = <T> (arg: T) : T => arg; // now it will work for any type passed

// Utitlity function 
const isObj = <T> (arg: T): boolean =>{
    return typeof arg === 'object' && arg!== null && !Array.isArray(arg)
}

console.log(isObj("avinas"));
console.log(isObj(1))
console.log(isObj([1,2,3,4]));
console.log(isObj(undefined));
console.log(isObj(null));
console.log(isObj({}));

// 

const isTrue = <T> (arg: T) : {arg: T, is: boolean} => {
    if(Array.isArray(arg) && !arg.length){
        return {arg, is: false};
    }
    if(isObj(arg) && !Object.keys(arg as keyof T).length){
        return {arg, is: false};
    }
    return {arg, is:!!arg};
}


interface BoolCheck<T> {
    arg: T,
    is: boolean;
}

const checkBooleanValue = <T> (arg: T) : BoolCheck<T> => {
    if(Array.isArray(arg) && !arg.length){
        return {arg, is: false};
    }
    if(isObj(arg) && !Object.keys(arg as keyof T).length){
        return {arg, is: false};
    }
    return {arg, is:!!arg};
}

interface HasID {
    id: number;
}

const processUser = <T extends HasID> (user: T) : T => {
    return user;
}

console.log(processUser({id: 1, name: "test"}));
// console.log(processUser({name: "test"}));

// Generic function to get user properties 
// const getUserProperty = <T extends HasID, K extends typeof T> (users: T[], key: K): T[k][] => {
//     return users.map(user => user[key]);
// }

// use generics in class
class User<T> {
    data: T;
    constructor(data: T){
        this.data = data;
    }

    get state() : T {
        return this.data;
    }

    set state(value: T) {
        this.data = value;
    }

    getValue(): T {
        return this.data;
    }
}

const store = new User("Avinas");

console.log(store.state);
// store.state = 1;//Type 'number' is not assignable to type 'string' typescript infers type as tring as we have p[assed string in constructore

// We can define the type whle make an instance of the generic class
const store1 = new User<string>("Avinas"); // in this case it will take only string

const store2 = new User<string | number>("Avinas"); // in this case
store2.state = 1;//Type 'number' is not assignable to type '