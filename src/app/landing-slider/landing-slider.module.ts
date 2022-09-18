import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingSliderPageRoutingModule } from './landing-slider-routing.module';
import { SwiperModule } from 'swiper/angular';
import { LandingSliderPage } from './landing-slider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingSliderPageRoutingModule,
    SwiperModule
  ],
  declarations: [LandingSliderPage]
})
export class LandingSliderPageModule {}
