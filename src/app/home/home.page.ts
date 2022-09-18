import { Component, OnInit } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private auth: Auth,
    private router: Router,
    private alertController: AlertController,
    private navCtrl: NavController) {
      
  }
 
  username:any;
  ngOnInit(){
    const uid=this.auth.currentUser.uid;
    this.authService.getUserById(uid).subscribe(res =>{
      console.log(res);
      this.username=res.name;
      
    });
    
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

  routeToGoals(){
   
    this.navCtrl.navigateForward(['goals'], {replaceUrl: true});
  }
  routeToVideos(){
    this.navCtrl.navigateForward(['videos'], {replaceUrl: true});
  }
  routeToBlogs(){
    this.navCtrl.navigateForward(['blogs'], {replaceUrl: true});
  }
  routeToMusic(){
    this.navCtrl.navigateForward(['music'], {replaceUrl: true});
  }
  routeToSupport(){
    this.router.navigateByUrl('https://wa.me/919930276758')
  }
}
