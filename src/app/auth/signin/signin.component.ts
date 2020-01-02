import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm:FormGroup;
  errorMessage:string;
  submitted = false;

  constructor(
              private formBuilder:FormBuilder,
              private authService : AuthService ,
              private router:Router
             ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.signInForm.controls; }

  onSubmit(){
    console.log("submit de signIN");

    this.submitted = true;
   const email=this.signInForm.get('email').value;
   const password=this.signInForm.get('password').value;
   console.log("email= "+email);
   console.log("mor de passe est = "+ password);
    this.authService.signInUser(email,password).then(
     ()=>{
      console.log("user authentifié");

        this.router.navigate(['/courses']);
         },
    (error)=>{
      console.log("user nonnnn authentifié  this.errorMessage= " +  this.errorMessage);

    this.errorMessage;
    }
    )
  }
}
