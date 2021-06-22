import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import firebase from 'firebase/app';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading:boolean = false;
  serverMessage: string = '';
  data:any;
  registerForm: FormGroup;
  showMessage: boolean = false;
  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder, private db: AngularFirestore, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.minLength(1), Validators.required]],
      lastName: ['', [Validators.minLength(1), Validators.required]],
      terms: ['', [Validators.required]],
      userName: ['', [Validators.minLength(8), Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      passwordConfirm: ['', []]
    });
  

   }

  ngOnInit(): void {}
    

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get userName() {
    return this.registerForm.get('userName');
  }

  get passwordConfirm() {
    return this.registerForm.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    return this.password!.value === this.passwordConfirm!.value;
  }

  async onSubmit() {
    this.loading = true;

    const email:string = this.email?.value;
    const password  = this.password?.value;
    const firstName = this.firstName?.value;
    const lastName = this.lastName?.value;
    const userName = this.userName?.value;

    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        console.log(credential.user)
        let tempUser = {
          displayName: credential.user?.displayName,
          email: credential.user?.email,
          emailVerified: credential.user?.emailVerified,
          isAnonymous: credential.user?.isAnonymous,
          phoneNumber: credential.user?.phoneNumber,
          photoURL: credential.user?.photoURL,
          uid: credential.user?.uid,
          firstName,
          lastName,
          userName
        }
        this.router.navigate(['/dashboard'])
        return this.updateUserData(tempUser); // if using firestore
      })
      .catch(error => {
        console.log(error.message);
        this.notify(error.message)
      });
    this.loading = false;
    
  }

  updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
    user = Object.assign({}, user, new User())
    return userRef.set(user);
  }

  notify(message:string) {
    this.serverMessage = message;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 10000)
  }

}
