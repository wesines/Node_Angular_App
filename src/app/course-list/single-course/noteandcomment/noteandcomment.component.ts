import { Component, OnInit } from '@angular/core';
import { Course } from 'src/models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-noteandcomment',
  templateUrl: './noteandcomment.component.html',
  styleUrls: ['./noteandcomment.component.scss']
})
export class NoteandcommentComponent implements OnInit {
  tabetoilepleine:any;
  tabetoilevide:any;
  cours : Course;
  etoilevide:number;
 etoilepleine:number;
 noteForm:FormGroup;
 comment={date:null,valeur:0,message:''};
 avis=[];
 today= new Date();
  jstoday = '';

  constructor(private formBuilder:FormBuilder , private route:ActivatedRoute,private firestore: AngularFirestore,
    private router:Router,private courseService:CoursesService) {
      this.noteForm=this.formBuilder.group({
        valeur:['',Validators.required],
        message:['',Validators.required],
     })}


  ngOnInit() {
    
    console.log("I am in noteandcomment  component");
    this.cours=new Course('',0,0,null,0,[]);
    const id=this.route.snapshot.params['id'];
    console.log("id = "+id);
    this.courseService.getSingleCourses(+id).then(
      (course:Course)=>{
      this.cours=course;
      console.log("this.cours.note" + this.cours.note);
  }




  
  );
}
onSaveNoteandComment(){
  this.cours=new Course('',0,0,null,0,[]);

  const id=this.route.snapshot.params['id'];
  this.courseService.getSingleCourses(+id).then(
    (course:Course)=>{
    this.cours=course;
    const valeur=this.noteForm.get('valeur').value;  console.log("valeur"+valeur);
    const commentaire=this.noteForm.get('message').value;  console.log("commentaire"+commentaire);
    this.avis.push({date:this.jstoday,valeur:valeur,message:commentaire });
    this.firestore.doc('Courses/' + this.cours.avis).update(this.cours);
    console.log("I finish voila ma  course == " + this.cours);
})
   
   
}

/*
    

this.afs.collection('users').doc(this.user.id).update({"pageID": firebase.firestore.FieldValue.arrayUnion(botID)})

pageID
tableau
bech tzidou valeur
alli hiya botID

  console.log("je vais enregistrer les notes");
  this.cours=new Course('',0,0,null,0,[]);

  const id=this.route.snapshot.params['id'];
  this.courseService.getSingleCourses(+id).then(
    (course:Course)=>{
    this.cours=course;
  
  const valeur=this.noteForm.get('valeur').value;  console.log("valeur"+valeur);

  const commentaire=this.noteForm.get('message').value;  console.log("commentaire"+commentaire);

  console.log("Avant lajout this.cours.avis"+this.cours.avis);
  let now = new Date();
  this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
          
          this.avis.push({date:this.jstoday,valeur:valeur,message:commentaire });
      


        if(commentaire !=''){
        
          let now = new Date();
          this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
          
          this.avis.push({date:this.jstoday,valeur:valeur,message:commentaire });
      
          const coursesRef = firebase.database().ref("/Courses")
          .update("modifierAvis", (data) => this.cours.avis
          )
       //   updateTodo2(todo: any, newValue: string): void {
       //     this.af.object('/todos/' + todo.$key)
       //       .update({ content: newValue, done: todo.done });    
          }
          console.log("Apres lajout this.cours.avis=="+this.cours.avis);
        
         // this.courseService.saveCourses();
        

            console.log("I finish" + this.cours);
  
     }
    })
   
  
}
 */


onBack(){
  const id=this.route.snapshot.params['id'];
 this.router.navigate(['/courses','view',id]);
}
}