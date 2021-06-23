import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { filter, map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  userName: string | null |undefined;
  //user:any
  displayedUser: any;
  currentClass:string = 'dark'
  constructor(public auth: AuthService, private route:ActivatedRoute, private db: AngularFirestore) { 
    
  }

  ngOnInit(): void {
     this.userName = this.route.snapshot.paramMap.get('userName');
     console.log(this.userName)
     const users = this.db.collection("users", ref => ref.where('userName', '==', this.userName))
     
     this.displayedUser = users.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        console.log('data', data)
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
     )
     console.log( 'dispplayed user', this.displayedUser)
     //this.displayedUser = user
  }

}
