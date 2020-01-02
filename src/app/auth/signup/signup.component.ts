import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

   signUpForm:FormGroup;
   errormessage:string;
  submitted=false;
  constructor(private authService:AuthService,private router : Router, private formBuilder:FormBuilder) { }

  ngOnInit() {

    this.initForm();
  }


initForm(){
  this.signUpForm=this.formBuilder.group({
    email:['',[Validators.email, Validators.required]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })

}

get f() { return this.signUpForm.controls; }
onSubmit(){
  console.log("recuperation des données saisies");
  this.submitted = true;

  const email=this.signUpForm.get('email').value;
  const  password=this.signUpForm.get('password').value;
  console.log("email= "+email);
  console.log("mor de passe est = "+ password);
  this.authService.createNewUser(email,password).then(
    ()=>{
      console.log("user créé");
      this.router.navigate(['/courses']);
    },
    (errors)=>{
      console.log("user nonnnn créé"+ this.errormessage);
      this.errormessage;}
  )
}
}
