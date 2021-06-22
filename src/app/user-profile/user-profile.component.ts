import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model'
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { finalize, switchMap, last } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  uploadPercent: Observable<number | null | undefined> =  new Observable();
  //downloadURL: Observable<string  | null | undefined> = new Observable();
  downloadURL:any;
  activeTab: string = 'info';
  profileUrl: Observable<string | null> = new Observable();
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, public authService: AuthService, private storage: AngularFireStorage, private router: Router) {
    
  }

  ngOnInit(): void {
    if(this.authService.user){
      console.log('found user', this.authService.user)
    }
  }

  updateUser(user:User) {
    console.log('updating user', user)
    return this.authService.updateUserData(user)
  }

  uploadProfilePic(event:any, user:User) {
    const file = event.target.files[0];
    const filePath = 'users/profilepic/' + user.userName + '.jpg';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available


    task.snapshotChanges().pipe(
      last(),  // emit the last element after task.snapshotChanges() completed
      switchMap(() => fileRef.getDownloadURL())
    ).subscribe(url => {
      console.log('url', url)
      user.photoURL = url;
      console.log('usr', user)
      return this.authService.updateUserData(user)
    })
      
  }

  uploadResume(event:any, user:User) {
    const file = event.target.files[0];
    const filePath = 'users/resume/' + user.userName + 'resume';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available


    task.snapshotChanges().pipe(
      last(),  // emit the last element after task.snapshotChanges() completed
      switchMap(() => fileRef.getDownloadURL())
    ).subscribe(url => {
      console.log('url', url)
      user.hasResume = true
      user.resumeLocation = url;
      console.log('usr', user)
      return this.authService.updateUserData(user)
    })
      
  }

  viewPublicProfile(user:User) {
    this.router.navigate(['/view/' + user.userName])
  }

}
