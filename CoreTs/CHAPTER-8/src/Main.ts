// Utility Types

// Partials
interface Assignment {
    stdentId: string,
    title: string,
    grade: number,
    verified?: boolean
}

const updateAssignment = (assign: Assignment, propsToUpdate: Partial<Assignment>): Assignment => {
    return {...assign, ...propsToUpdate};
}

const assign1 : Assignment = {
    stdentId: "1",
    title: "Maths",
    grade: 85
}

console.log(updateAssignment(assign1, {grade: 90}));
const assignGrade : Assignment =  updateAssignment(assign1, {grade: 95});
console.log(assignGrade);

// Required and Readonly

const recordAssignment = (assign1: Required<Assignment>): Assignment => {
    // send to db
    return assign1;
}

const assignVerified: Readonly<Assignment> = {...assignGrade, verified: true};

// Record

const hexColorMap: Record<string, string> = {
    red: "FF0000",
    green: "00FF00",
    blue: "0000FF"
}

// How to use Record with type literals
type Students = "Avi" | "Sam";
type LetterGrades = "A" | "B"| "C" | "D" | "E" | "F";

const finalGrades: Record<Students, LetterGrades> ={
    Avi: "A",
    Sam: "B"
}

// We can also do it with interface
interface InGrades {
    assign1: number,
    assign2: number
}

const inGHradeData: Record<Students, InGrades> = {
    Avi: {assign1: 90, assign2: 85},
    Sam: {assign1: 95, assign2: 90}
}

// Pick and ommit

type AssignResult = Pick<Assignment, "stdentId" | "grade">;

const score: AssignResult = {
    stdentId: "1",
    grade: 90
}

type AssignPreview = Omit<Assignment, "grade" | "verified">;

const preview: AssignPreview = {
    stdentId: "1",
    title: "Maths",
    // grade: 85//Object literal may only specify known properties, and 'grade' does not exist in type 'AssignPreview'.
}

// Exclude and Extract

type adjustedGrade = Exclude<LetterGrades, "F">;
type highGrade = Extract<LetterGrades, "A" | "B">;

// Nonnullable
 type AllPossibleGrades = "Dave" | "john"| "null" | undefined;

 type NamesOnly = NonNullable<AllPossibleGrades>;

// ReturnType
// type newAssign = {title:string, point: number} 
const createNewAssign = (title: string, point: number)  => {
    return {title, point};
}

type NewAssign = ReturnType<typeof createNewAssign>;

const tsAssign: NewAssign = createNewAssign("title", 100);
console.log(tsAssign);

// Parameters
type AssignPrams = Parameters<typeof createNewAssign>;

const assignArgs : AssignPrams = ["Generics", 100];
const tsAssign2: NewAssign = createNewAssign(...assignArgs);

console.log(tsAssign2);

// Awaited -  helps us with the ReturnType of a promise

interface User {
    id: number,
    name: string,
    username:string,
    email: string
}

const fetchUser = async () : Promise<User[]> => {
    const data = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    ).then(res => {
        return res.json();
    }).catch(err => {
        if (err instanceof Error) {
            console.log(err.message);
            
        }
    });
    return data;
}

console.log(fetchUser());

// type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUser>>;

fetchUser().then(users => console.log(users));
