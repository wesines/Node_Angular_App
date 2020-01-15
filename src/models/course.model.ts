
export class Course{
    preparation:string;
    ingredient:string
    image:string;
   // avis:[Date,number,string];
    constructor(public name: string, 
                public duration: number,
                public NBperson: number,
                public difficulty: string,
                public note: number,
                public category: string[]
                
                ) {
}
}