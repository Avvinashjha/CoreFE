// Typoe casting or Type assertions

type One = string;
type Two = string | number;
type Three = 'hello';

// Convert to more or less specific
let a:One = 'hello';
let b = a as Two;// less specific
let c = a as Three; // more specific

// Usinf angle Brackets this can not be used in .txs file 
let d = <One>'world';
let e = <string | number>'world';


//  
const addOrConcat = (a: number, b: number, c:'add'| 'concat'): number| string =>{
    if(c=== 'add'){
        return a + b;
    }
    return ''+a + b ;
}

// Explicitly telling ts that we know we will return string 
let myVal: string = addOrConcat(10,20,'concat') as string;

// Note: TS sees no problem - but a string is returned
let myVal2: number = addOrConcat(10,20,'concat') as number;

console.log(myVal2);

//conversion of type 'number' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
// 10 as string

// overule typescript
// Double assertion or doble casting
(10 as unknown) as string;

// The DOM

// This is showing the type as Element | null
const imgById = document.querySelector('#myImg');

// This is showing the type HTMLElement | null
const imgElement = document.getElementById("#myImage") as HTMLImageElement;

// This is showing the type as HTMLImageElement
const img = document.querySelector('img')! ;

img.src // can be done
imgElement.src //'imgElement' is possibly 'null'
