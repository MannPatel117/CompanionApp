import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController, AlertController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';

import { Firestore, setDoc, updateDoc} from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';
@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {
  presentingElement = undefined;
  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private actionSheetCtrl: ActionSheetController
    ) {
    
  }
  goal1:any;
  goal11:any;
  goal2:any;
  goal3:any;
  message11="Goal";
  message12="1";
  today:any;
  changedDate = '';
  reclastestDate:string;
  pipe = new DatePipe('en-US');
  changeFormat(today){
    let ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    this.changedDate = ChangedFormat;
    console.log(this.changedDate);
    
  }
  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.today = new Date();
    this.changeFormat(this.today);
    
    this.checkDate();
  }
  flag=true;
  checkDate()
  {
    const uid=this.auth.currentUser.uid;
    this.authService.getUserById(uid).subscribe(res =>{
      console.log(res);
      this.reclastestDate=res.latestDate;  
      console.log(this.reclastestDate);
      if(this.changedDate == this.reclastestDate)
      {
        this.goal1=res.goal1;
        this.goal2=res.goal2;
        this.goal3=res.goal3;
      }
      else
      {
        if(this.flag==true)
        {
          const userDocRef = doc(this.firestore, `users/${uid}`);
          updateDoc(userDocRef, { goal1:0,goal2:0,goal3:0,latestDate:this.changedDate});
          this.flag=false;
        }
      }
    });
  }
  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };
  canDismiss2 = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };
  canDismiss3 = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };
  submitGoal1(){
    
  }
  changedGoal1(){
    console.log(this.goal11);
    switch(this.goal11)
    {
      case '0': this.message11="You need to"; this.message12=" Talk to Someone";

      break;
      case '1': this.message11="You need to"; this.message12=" more people!";
  
      break;
      case '2': this.message11="You are "; this.message12="going well";

      break;
      case '3': this.message11="You are "; this.message12="going great";
    
      break;
      case '4': this.message11="You have "; this.message12="completed today's goal!";
      const uid=this.auth.currentUser.uid;
      const userDocRef = doc(this.firestore, `users/${uid}`);
      updateDoc(userDocRef, { goal1:1});
      break;
      default: console.log("Error");
    }
  }
 
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
 
  async logout()
  {
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl:true});
  }

  routeToHome(){
    this.router.navigateByUrl('/home', {replaceUrl:true});
  }
  routeToVideos(){
    this.router.navigateByUrl('/videos', {replaceUrl:true});
  }
  routeToBlogs(){
    this.router.navigateByUrl('/blogs', {replaceUrl:true});
  }
  routeToMusic(){
    this.router.navigateByUrl('/music', {replaceUrl:true});
  }
  routeToSupport(){
    this.router.navigateByUrl('/support', {replaceUrl:true});
  }
}
