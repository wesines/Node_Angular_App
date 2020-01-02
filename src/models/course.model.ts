import { NoteandcommentComponent } from 'src/app/course-list/single-course/noteandcomment/noteandcomment.component';

export class Course{
    preparation:string;
    ingredient:string
    image:string;
    avis:[Date,number,string];
    constructor(public name: string, 
                public duration: number,
                public NBperson: number,
                public difficulty: Date,
                public note: number,
                public category: string[]
                
                ) {
}
}