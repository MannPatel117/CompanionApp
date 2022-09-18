import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { NavController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);
@Component({
  selector: 'app-landing-slider',
  templateUrl: './landing-slider.page.html',
  styleUrls: ['./landing-slider.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingSliderPage implements AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;
  constructor(private navCtrl:NavController) { }

  ngAfterContentChecked()
  {
      if(this.swiper)
      {
        this.swiper.updateSwiper({});
      }
  }
  ngOnInit() {
  }
  loginPage(){
    this.navCtrl.navigateForward(['login'])
  }
}
