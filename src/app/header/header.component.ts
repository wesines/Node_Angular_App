import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth:boolean;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
        this.isAuth=true;
        console.log("je suis authentifié et la valeur de isauth = "+this.isAuth);

        }    else{
          this.isAuth=false;
          console.log("not authentified et la valeur de isauth = "+ this.isAuth);

        }
        }
    )
      }

      onSignOut(){
        this.authService.signOutUser();
      }
 

  }



  

