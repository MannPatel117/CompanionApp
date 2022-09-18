import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { NewsService } from '../news.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.page.html',
  styleUrls: ['./blogs.page.scss'],
})
export class BlogsPage implements OnInit {
  data: any;
  constructor(
    private newsService: NewsService,
    private menu: MenuController,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
    ) {
      
  }
  currentArticle: any;
  ngOnInit() {
    this.newsService
    .getData('everything?q=meditation')
    .subscribe(data => {
      console.log(data);
      this.data = data;
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

  routeToHome(){
    this.router.navigateByUrl('/home', {replaceUrl:true});
  }
  routeToVideos(){
    this.router.navigateByUrl('/videos', {replaceUrl:true});
  }
  routeToGoals(){
    this.router.navigateByUrl('/goals', {replaceUrl:true});
  }
  routeToMusic(){
    this.router.navigateByUrl('/music', {replaceUrl:true});
  }
  routeToSupport(){
    this.router.navigateByUrl('https://wa.me/919930276758', {replaceUrl:true});
  }

}
