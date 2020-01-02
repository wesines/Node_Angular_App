import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/models/course.model';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {


  public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Est ce que vous etes sûr de supprimer cette recette?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
etoilevide:number;
  cours:Course;
  courses: Course[];
  CourseSubscription: Subscription;
  constructor(private courseService : CoursesService, private router:Router) { }
  cheminImage:any="../images/supprimer.png";


  ngOnInit() {

    console.log("I am in courselist component");
  this.CourseSubscription= this.courseService.SubjectCourses.subscribe( co=>this.courses=co); 
    
    //  this.pkmservice.getPokemons().subscribe(pokem=>this.poks=pokem);

    
   
    this.courseService.getCourses();
    this.courseService.emitCourses();
    console.log("this.course.length"+this.courseService.getCourses.length);
  }

/*
onNoteEtoile(id:number){
 this.courseService.getSingleCourses(id).then(
      (course:Course)=>{
      this.cours=course;
      }
 );
if( this.cours.note == 5 )
return this.etoilevide=0;
else
{

  this.etoilevide=5-this.cours.note;
}


}
*/


  onNewCourse(){
    this.router.navigate(['/courses','new']);
  }

  onDeleteCourses(courses:Course){
    console.log("i am in listcomponent  deletecourses and i will go to serviceremove");
    this.courseService.removeCourses(courses);
  }
  onViewCourse(id:number){
    this.router.navigate(['/courses','view',id]);
  }

  onDestroy(){
    this.CourseSubscription.unsubscribe();
  }

}