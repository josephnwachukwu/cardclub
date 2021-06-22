import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import firebase from 'firebase'


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFirestoreModule
  ],
  providers: [

  ],
  exports: [
    //AuthService
  ]
})
export class AuthModule { }
