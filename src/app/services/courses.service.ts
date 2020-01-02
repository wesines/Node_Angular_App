import { Injectable, Input, OnInit } from '@angular/core';
import { Course } from 'src/models/course.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CoursesService  {
  courses :Course[]=[];
  SubjectCourses = new Subject<Course[]>();



  constructor(private firestore: AngularFirestore ) { 

  }


  saveCourses(){
    firebase.database().ref('/courses').set(this.courses);
  }
  emitCourses(){
    this.SubjectCourses.next(this.courses);
  }

  getCourses(){
    firebase.database().ref('/courses')
    .on('value',(data) =>{
      
      this.courses=data.val()?data.val():[];
     this.emitCourses(); 
     console.log("data.val de getcourses de Courseservice est egal à =" + data.val());

    }
    )
  }

  getSingleCourses(id: number){
    return new Promise(
      (resolve,reject)=>{
        firebase.database().ref('/courses/'+id).once('value').then(
          (data)=>{
           resolve(data.val());
            }, 
           (error)=>{
             reject(error);
            }
            
        );
      }
    );
  }
  createCoffeeOrder(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("coffeeOrders")
            .add(data)
            .then(res => {}, err => reject(err));
    });
}

  creatNewCourse(newCourse:Course){
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("coffeeOrders")
          .add(newCourse)
          .then(res => {}, err => reject(err));
  });
   /* console.log('i am in create new course"');
    this.courses.push(newCourse);
    this.saveCourses();
    this.emitCourses();
    console.log("this.courses.length"+this.courses.length);*/
  }
removeCourses(course: Course){
  console.log("i am in service remove");
   
const C=this.courses.findIndex(
  (courseE1)=>{
    if(courseE1 === course)
    {console.log("c bon j'ai supprimé");
    return true;
}
  }
  
)

this.courses.splice(C,1);
this.saveCourses();
this.emitCourses();

}


getCategoriesTypes(): Array<string> {
  return ['sucré', 'salé' ];
}
uploadFile(file: File) {
  return new Promise(
    (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase.storage().ref()
        .child('images/' + almostUniqueFileName + file.name).put(file);
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Chargement…');
        },
        (error) => {
          console.log('Erreur de chargement ! : ' + error);
          reject();
        },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    }
  );
}




}



