import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-list/course-form/course-form.component';
import { SingleCourseComponent } from './course-list/single-course/single-course.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { CoursesService } from './services/courses.service';
import { AuthguardService } from './services/authguard.service';
import {  BorderCardDirective } from './borderpkm-card.directive';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { CourseUpdateComponent } from './course-list/course-update/course-update.component';
@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseFormComponent,
    SingleCourseComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    BorderCardDirective,
    CourseUpdateComponent,
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ConfirmationPopoverModule.forRoot({ confirmButtonType: 'danger'}), // set defaults here
    AppRoutingModule
  ],
  providers: [AuthService,CoursesService,AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
