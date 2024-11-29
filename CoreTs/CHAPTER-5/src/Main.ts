// Class In Typescript

// Here as you can see there is redundance of variables and we can avoid that
class Coder {
    name: string;
    music: string;
    age: number;
    lang:string;
    constructor(name: string, music: string, age: number, lang: string) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
}
// asetion
class Coder1 {
    name: string;
    music: string;
    age: number;
    lang:string;
    secondLang!:string; // you can add this and type script will allow you to move forward but why?
    constructor(name: string, music: string, age: number, lang: string) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
}

// access modifier
class Coder2 {
    constructor(public readonly name: string,public music: string,private age: number,protected lang: string = "typescript") {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }

    public getAge(): number {
        return this.age;
    }
}

const coderObj1 = new Coder2("Sam", "Escobar", 25); //  here the language will be typescript
// console.log(coderObj1.age); // here you can see age can not be accesed outsiide of the class

const coder =  new Coder2("Avinash", "Saiyaan", 24, "java"); // here language will be java 


// What is public private and protected
// Public can be accessed in all instance of the object
// Protected can be 

// Lets ectend s the coder2 class inheritance
class WebDev extends Coder2 {
    constructor(public computer: string, name: string, age: number, music: string){
        super(name, music, age);
        this.computer = computer;
    }

    public getLanguage(): string {
        // here we can access
        return `I write ${this.lang}`
    } 
}

const sam =  new WebDev("Window", "sam", 24, "woohoo");
//Property 'lang' is protected and only accessible within class 'Coder2' and its subclasses
// console.log(sam.getLanguage(), sam.getAge(), sam.lang);

// Interface

interface Student {
    readonly name: string,
    age: number,
    grade: string,
    scores: number[]
    greet(name: string): string;
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
        return `Hello ${name} ! I am ${this.name}`
    }
}

const s1 =  new Student1("s1", 23, "one", [1,2,3]);
// s1.name = "Student";
console.log(s1.greet("Avinash"));

////////////////////////////////////////////////////////////////

// Static Keyword

class Player {
    static count: number = 0;
    getNumber(): number {
        return Player.count;
    }

    name: string;
    id: number;

    constructor(name: string) {
        this.name = name;
        this.id = ++Player.count;
    }
}


const player1 = new Player("Avinash");
const player2 = new Player("sam");

console.log(player1, Player.count);


////////////////////////////////////////////////////////////////
// getter and setters

class Bands {
    private dataState: string[];

    constructor(){
        this.dataState = [];
    }

    public get data(): string[] {
        return this.dataState;
    }

    // setter can't return the value
    public set data(value: string[]) {
        if(Array.isArray(value) && value.every(el => typeof el === 'string')){
            this.dataState = value;
        }else{
            throw new Error("Invalid data type");
        }
    }
}

const myBands =  new Bands();
myBands.data = ["Avinash", "Sam"];
console.log(myBands);
