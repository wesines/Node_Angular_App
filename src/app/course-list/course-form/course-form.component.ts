import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators,FormArray,FormControl, ValidatorFn } from '@angular/forms';
import { Course } from 'src/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  courseForm:FormGroup;
fileIsUploading = false;
fileUrl: string;
fileUploaded = false;
    itemNumberArray = [1, 2, 3, 4,5,6,7,8,9,10];
      typesCategories = [];
      diff=["Facile","Moyen","Difficile"];
 



  constructor(private formBuilder:FormBuilder,private courseService:CoursesService,private router:Router) {
    this.courseForm=this.formBuilder.group({
      name:['',Validators.required],
      preparation:['',Validators.required],
      ingredient:['',Validators.required],
      NBperson:['',Validators.required],
      difficulty:['',Validators.required],
     // note:['',Validators.required],
      duration:['',Validators.required],
      
    types: new FormArray([])
    }); 
    of(this.getTypes()).subscribe(orders => {
      this.typesCategories = orders;
      this.addCheckboxes();
    });
   }

  ngOnInit() { this.itemNumberArray;}
 

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

getTypes(){

  return [
    { id:"0" , name:"sucré"    },
    { id:"1" , name:"salé"    }

  ];
}

  private addCheckboxes() {
    this.typesCategories.forEach((o, i) => {
      const control = new FormControl(); // if first item set to true, else false
      (this.courseForm.controls.types as FormArray).push(control);
    });
  }
   




  onSaveCourse(){
    console.log("je vais enregistrer la nouvelle formation");
    console.log("this.courseForm.value" + this.courseForm.value);
    const name=this.courseForm.get('name').value;


    const categoryselected = this.courseForm.value.types
    .map((v, i) => v ? this.typesCategories[i].name : null)
    .filter(v => v !== null);


    const duration=this.courseForm.get('duration').value;
    const note=this.courseForm.get('note').value;
    const preparation=this.courseForm.get('preparation').value;
    const NBperson=this.courseForm.get('NBperson').value;

    const difficulty=this.courseForm.get('difficulty').value;


    const ingeredient=this.courseForm.get('ingredient').value;
    const newCourse=new Course(name,duration,NBperson,difficulty,note,categoryselected);
    newCourse.preparation=preparation;
    newCourse.ingredient=ingeredient;

    if(this.fileUrl && this.fileUrl !== '') {
      newCourse.image = this.fileUrl;
    }

    console.log("le cours à enregistrer est :name= "+
     name +' , category=  '+ categoryselected  +' , duration  '+
      duration  +' , note '+ note  +' , preparation ='+ 
      preparation  +' , ingredient= '+ ingeredient+' , nbperson=  '+
      NBperson+'  , difficulte= '+ difficulty)
    this.courseService.creatNewCourse(newCourse);
    this.router.navigate(['/courses']);
  }

}
