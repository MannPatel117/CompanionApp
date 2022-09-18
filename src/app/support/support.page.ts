import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private auth: Auth,
    private router: Router,
    private alertController: AlertController) {
      
  }

  ngOnInit() {
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
  routeToGoals(){
    this.router.navigateByUrl('/goals', {replaceUrl:true});
  }

}
