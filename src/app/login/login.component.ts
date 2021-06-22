import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import firebase from 'firebase/app';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading:boolean = false;
  serverMessage?: string;
  data:any;
  loginForm: FormGroup;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder, private db: AngularFirestore, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email?.value;
    const password  = this.password?.value;

    try {
      this.data = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('data', this.data)
      if(this.data?.user?.uid){
        console.log('we found user');
        this.router.navigate(['/userprofile'])
      }
    }
    catch (e) {
      this.serverMessage = e
    }
  }
}
