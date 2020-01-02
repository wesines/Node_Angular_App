import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() { }

  createNewUser(email:string, password:string){
    console.log("i am in authservice create new user");

    return new Promise (
      (resolve,error)=>
      firebase.auth().createUserWithEmailAndPassword(email,password).then(
        ()=>{
          console.log("create new user resolved");
          //si la creation de user fonctionne  alors on return un resolve
          resolve();
        },
        (error)=>{
          console.log("erreur creation new user " + error);
          reject(error);
        }
      )
    )

  }

  
  
 /*  signInUser(email:string,password:string){
    return new Promise(
      (resolve,error)=>
      firebase.auth().signInWithEmailAndPassword(email,password).then(
        ()=>{
          resolve();
        }
 */
  signInUser(email:string,password:string){
    return new Promise(
      (resolve,error)=>
      firebase.auth().signInWithEmailAndPassword(email,password).then(
        ()=>{
          console.log("signin user dans Authservice resolved");
          //si la creation de user fonctionne  alors on return un resolve
          resolve();
        },
       
        (error)=>{
          console.log("signin user dans Authservice nooooooooon"+error);
         
          reject (error);}
      )
    )
  }


  signOutUser(){
    firebase.auth().signOut();
  }
}
