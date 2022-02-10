import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponRoutingModule } from './coupon-routing.module';
import { CuisinesComponent } from './components/cuisines.component';


@NgModule({
  declarations: [CuisinesComponent],
  imports: [
    CommonModule,
    CouponRoutingModule
  ]
})
export class CouponModule { }
