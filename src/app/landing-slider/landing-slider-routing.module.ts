import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingSliderPage } from './landing-slider.page';

const routes: Routes = [
  {
    path: '',
    component: LandingSliderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingSliderPageRoutingModule {}
