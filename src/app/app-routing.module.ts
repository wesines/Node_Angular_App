import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { CourseFormComponent } from './course-list/course-form/course-form.component';
import { SingleCourseComponent } from './course-list/single-course/single-course.component';
import { AuthguardService } from './services/authguard.service';
import { NoteandcommentComponent } from './course-list/single-course/noteandcomment/noteandcomment.component';


const routes: Routes = [
  {path:'auth/signin',component:SigninComponent},
  {path:'auth/signup',component:SignupComponent},
  {path:'courses',canActivate: [AuthguardService],component:CourseListComponent},
  {path:'courses/new',canActivate: [AuthguardService],component:CourseFormComponent},
  {path:'courses/view/:id',canActivate: [AuthguardService],component:SingleCourseComponent},
  {path:'courses/noteandcomments/:id',canActivate: [AuthguardService],component:NoteandcommentComponent},
  {path:'',redirectTo:'courses',pathMatch:'full'},
  {path:'full',redirectTo:'courses'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
