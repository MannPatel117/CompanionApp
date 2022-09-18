import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { docData, Firestore, setDoc} from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) { 
    
  }
  today:any;
  changedDate = '';
  pipe = new DatePipe('en-US');
  changeFormat(today){
    let ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    this.changedDate = ChangedFormat;
    console.log(this.changedDate);
  }

  async register ({name,email,password})
  {
    try{
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      this.today = new Date();
      this.changeFormat(this.today);
      const uid=user.user.uid;
      const userDocRef = doc(this.firestore, `users/${uid}`);
      setDoc(userDocRef, { name,goal1:0,goal2:0,goal3:0,latestDate:this.changedDate });
      return user;
      
    }
    catch(e)
    {
      return null;
    }
  }

  async login ({email,password})
  {
    try{
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      
      return user;
    }
    catch(e)
    {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  getUserById(id: string){
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, {idField: 'id'} );
  }
  
  
}

