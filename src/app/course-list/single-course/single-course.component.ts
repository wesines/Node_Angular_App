import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/models/course.model';

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.scss']
})
export class SingleCourseComponent implements OnInit {
  tabetoilepleine:any;
  tabetoilevide:any;
  cours : Course;
  etoilevide:number;
 etoilepleine:number;
 index:number;
  constructor(private route:ActivatedRoute,private router:Router,private courseService:CoursesService) { }

  ngOnInit() {
    console.log("I am in single course component");
    this.cours=new Course('',0,0,null,0,[]);
    const id=this.route.snapshot.params['id'];
    this.courseService.getSingleCourses(+id).then(
      (course:Course)=>{
      this.cours=course;
      console.log("this.cours.note" + this.cours.note)
      if( this.cours.note == 5 )
    {
       this.etoilevide=0;
       this.etoilepleine=this.cours.note;
      this.tabetoilevide=new Array(this.etoilevide);
      this.tabetoilepleine=new Array (this.etoilepleine);
       console.log("etoilevide" + this.etoilevide+ "  etoilepleine  =" +this.etoilepleine);
       this.index=id;
    }
    else
    {
    
      this.etoilevide=5-this.cours.note;
      this.etoilepleine=this.cours.note;
      this.tabetoilevide=new Array(this.etoilevide);
      this.tabetoilepleine=new Array (this.etoilepleine);
      console.log("etoilevide = " + this.etoilevide+ "  etoilepleine  = " +this.etoilepleine);
      this.index=id;

    }
    }
    );
  

  }
  onPrint(){
    window.print();
}


  onBack(){
    this.router.navigate(['/courses']);
  }

}
