// let year: HTMLElement | null;
// year  =  document.getElementById("year") !;

// let thisYear : string;
// thisYear = (new Date().getFullYear() as unknown) as string ;

// if(year){
// year.setAttribute("datetime", thisYear);
// year.textContent = thisYear;
// }


const year = document.getElementById("year") as HTMLSpanElement;
const thisYear: string =  new Date().getFullYear().toString();

if(year){
    year.setAttribute("datetime", thisYear);
    year.innerHTML = thisYear;
}