import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';
//import { auth } from 'firebase';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User | null | undefined>;
  ref:any;
  private ordersCollecton: AngularFirestoreCollection<Order>
  constructor(private afAuth: AngularFireAuth,private db: AngularFirestore, private router: Router) { 
    
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log('current user', user.uid)
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

  }
  signOut() {
    firebase.auth().signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  updateUserData(user: any) {
    console.log('user passed to auth', user)
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
    return userRef.set(user);
  }

  updateOrderData(order:any) {
    console.log('order passed to auth', order)
    this.ordersCollecton = this.db.collection<Order>('orders')
    return this.ordersCollecton.add(order)
  }
}
