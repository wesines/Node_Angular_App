import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/models/course.model';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.scss']
})
export class CourseUpdateComponent implements OnInit {


  cours : Course;
  courseForm:FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  itemNumberArray = [1, 2, 3, 4,5,6,7,8,9,10];
  diff=["Facile","Moyen","Difficile"];
  typesCategories = [];

   id:number;

  constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,
    private router:Router,private courseService:CoursesService) {
      this.courseForm = new FormGroup({
      name:new FormControl(),
      preparation:new FormControl(),
      ingredient:new FormControl(),
      NBperson:new FormControl(),
      difficulty:new FormControl(),
      duration:new FormControl(),
      category:new FormControl(),
      types: new FormArray([]),
   });
    }
    

  ngOnInit() {
    console.log("I am in update course component");
    
    this.id=this.route.snapshot.params['id'];
    this.cours=new Course('',0,0,null,0,[]);
    this.courseService.getSingleCourses( this.id).then(
   (course:Course)=>{
   this.cours=course;
    this.courseForm=this.formBuilder.group({
      name:[this.cours.name],
      preparation:[this.cours.preparation],
      ingredient:[this.cours.ingredient],
      NBperson:[this.cours.NBperson],
      difficulty:[this.cours.difficulty],
      duration:[this.cours.duration],
      category:[this.cours.category],
      types: new FormArray([]),
      
    }); 
   of(this.getTypes()).subscribe(types => {
      this.typesCategories = types;
      this.addCheckboxes();
    });
   
 console.log("recuperation des données de la recette à modifier :name= "+
    this.cours.name +' , category=  '+ this.cours.category  +' , duration=  '+
    this.cours.duration  + 'preparation= '+this.cours.preparation + 
     ' , ingredient= '+ this.cours.ingredient+' , nbperson=  '+
     this.cours.NBperson+'  , difficulte= '+ this.cours.difficulty)
  });
}


getTypes(){  return [    { id:"0" , name:"sucré"    },
                         { id:"1" , name:"salé"    }

                     ];
          }

  private addCheckboxes() {
    this.typesCategories.forEach((o, i) => {

      const control = new FormControl( );
      (this.courseForm.controls.types as FormArray).push(control);
    });
  }
onUploadFile(file: File) {
  this.fileIsUploading = true;
  this.courseService.uploadFile(file).then(
    (url: string) => {
      this.fileUrl = url;
      this.fileIsUploading = false;
      this.fileUploaded = true;
    }
  );
}

detectFiles(event) {
  this.onUploadFile(event.target.files[0]);

}


  onUpdateCourse(){
console.log("je vais enregistrer les nouveaux updates");
    const name=this.courseForm.get('name').value;
    const selectedcategory = this.courseForm.value.types
    .map((v, i) => v ? this.typesCategories[i].name : null)
    .filter(v => v !== null);
    const duration=this.courseForm.get('duration').value;
    const note=this.courseForm.get('note').value;
    const preparation=this.courseForm.get('preparation').value;
    const NBperson=this.courseForm.get('NBperson').value;
    const difficulty=this.courseForm.get('difficulty').value;
    const ingeredient=this.courseForm.get('ingredient').value;

    const newCourse=new Course(name,duration,NBperson,difficulty,note,selectedcategory);
    newCourse.preparation=preparation;
    newCourse.ingredient=ingeredient;
    if(this.fileUrl && this.fileUrl !== '') {
      newCourse.image = this.fileUrl;
    }

    console.log("le cours à enregistrer est :name= "+
     name +' , category=  '+ selectedcategory  +' , duration  '+
      duration  +' , note '+ note  +' , preparation ='+ 
      preparation  +' , ingredient= '+ ingeredient+' , nbperson=  '+
      NBperson+'  , difficulte= '+ difficulty)



 //this.courseService(newCourse);


    this.router.navigate(['/courses']);
  }
  }
