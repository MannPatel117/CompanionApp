import { Component, OnInit, ViewChild } from '@angular/core';
import { Howl } from 'howler';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController, AlertController, IonRange } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

export interface Track{
  name: string;
  img: string;
  path: string;
}
@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],

})
export class MusicPage implements OnInit {
  currentImg:string;
  progress=0;
  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private auth: Auth,
    private router: Router,
    private alertController: AlertController) {
      
  }

  playlist: Track[]=[
    {
      name:'Tropical Nature',
      img: 'https://images.unsplash.com/photo-1604213410393-89f141bb96b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      path: '../../assets/music/nature.mp3'
    },
    {
      name:'Mountain Meditation',
      img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      path: '../../assets/music/mountain.mp3'
    },
    {
      name:'Calm Waves',
      img: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=326&q=80',
      path: '../../assets/music/waves.mp3'
    },
    {
      name:'Soothing Birds',
      img: 'https://images.unsplash.com/photo-1548509925-0e7aa59c6bc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
      path: '../../assets/music/chirping.mp3'
    },
    {
      name:'Starry Night',
      img: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1213&q=80',
      path: '../../assets/music/night.mp3'
    },
  ]
  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;

  @ViewChild('range', { static: false}) range: IonRange;
  start(track: Track)
  {
    if(this.player){
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],
      onplay: () => {
        this.currentImg=track.img;
        this.isPlaying=true;
        this.activeTrack = track;
      },
      onend: () => {

      }
    });
    this.player.play();
  }
  togglePlayer(pause){
    this.isPlaying = !pause;
    if(pause){
      this.player.pause();
    }
    else{
      this.player.play();
    }
  }
  next(){
    let index = this.playlist.indexOf(this.activeTrack);
    if (index != this.playlist.length-1)
    {
      this.start(this.playlist[index+1]);
    }
    else {
      this.start(this.playlist[0]);
    }
  }
  prev(){
    let index = this.playlist.indexOf(this.activeTrack);
    if (index >0)
    {
      this.start(this.playlist[index-1]);
    }
    else {
      this.start(this.playlist[this.playlist.length-1]);
    }
  }
  ngOnInit() {
    if(this.isPlaying == true)
    {
      this.currentImg=this.activeTrack.img;
    }
    else
    {
      this.currentImg='https://images.unsplash.com/photo-1625472603517-1b0dc72846ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';
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
    this.player.pause();
  }
  routeToVideos(){
    this.router.navigateByUrl('/videos', {replaceUrl:true});
    this.player.pause();
  }
  routeToBlogs(){
    this.router.navigateByUrl('/blogs', {replaceUrl:true});
    this.player.pause();
  }
  routeToGoals(){
    this.router.navigateByUrl('/goals', {replaceUrl:true});
    this.player.pause();
  }
  routeToSupport(){
    this.router.navigateByUrl('/support', {replaceUrl:true});
    this.player.pause();
  }

}
